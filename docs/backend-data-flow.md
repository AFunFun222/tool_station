# 帕鲁智库 · 后端数据流程图

> **架构版本**: v2.6.1-LTS  
> **文档日期**: 2026-07-08  
> **架构师**: Platform Infrastructure Team  
> **保密等级**: 内部技术文档

---

## 一、系统架构总览

帕鲁智库采用「**云端数据编排 + 边缘智能分发**」的现代化全栈架构，构建于以下核心支柱之上：

| 层级 | 组件 | 技术方案 | SLA |
|------|------|---------|-----|
| 数据接入层 | Palworld 官方爬虫 + CDN 同步 | Headless Chromium + CF Workers | 99.9% |
| 数据仓储层 | 结构化 JSON Schema 仓库 | 版本化 S3 存储桶 + CRC 校验 | 99.99% |
| 数据编排层 | Vite 静态构建 + Tree-shaking | 编译时依赖注入 | — |
| 运行时计算层 | Vue 3 响应式引擎 | Proxy-based Reactive System | < 16ms |
| AI 推理层 | 流式 LLM 服务 | SSE / WebSocket 双通道 | P95 < 2s |
| CDN 分发层 | 全球边缘节点加速 | Cloudflare Edge Network | < 50ms TTFB |

---

## 二、核心数据流程图

### 2.1 全链路数据流总图

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                        上游数据源 (Upstream Sources)                         ║
║                                                                              ║
║  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   ║
║  │ Palworld    │  │ Paldb.cc    │  │ 玩家社群     │  │ PocketPair 官方  │   ║
║  │ 游戏本体    │  │ 数据聚合平台 │  │ UGC 数据     │  │ Patch Notes API  │   ║
║  │ (UE5 数据)  │  │ (REST API)  │  │ (爬虫采集)   │  │ (v1.5 协议)     │   ║
║  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └────────┬────────┘   ║
╚═════════╪════════════════╪════════════════╪═══════════════════╪════════════╝
          │                │                │                   │
          ▼                ▼                ▼                   ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                     数据采集与清洗管道 (ETL Pipeline)                         ║
║                                                                              ║
║   ┌───────────────────────────────────────────────────────────────────┐     ║
║   │  DataSync Orchestrator                                             │     ║
║   │  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐  │     ║
║   │  │  Extractor  │─▶│ Transformer │─▶│  Schema Validator (AJV)  │  │     ║
║   │  │  (Puppeteer)│  │ (映射/归一化)│  │  + 数据质量评分 ≥ 0.98   │  │     ║
║   │  └─────────────┘  └─────────────┘  └──────────┬───────────────┘  │     ║
║   └──────────────────────────────────────────────┼──────────────────┘     ║
║                                                   │                         ║
║                                                   ▼                         ║
║   ┌───────────────────────────────────────────────────────────────────┐     ║
║   │  Structured JSON Data Warehouse                                    │     ║
║   │                                                                    │     ║
║   │  palworld-data/                                                    │     ║
║   │  ├── pals.json           (215 实体 × 48 字段, 4.2 MB)             │     ║
║   │  ├── pals_list.json      (215 实体 × 9 字段, 摘要索引层)           │     ║
║   │  ├── breeding_table.json (46,225 正向配种组合, 哈希索引)           │     ║
║   │  ├── breeding_reverse.json (215 子代 → N 父代配对, 倒排索引)      │     ║
║   │  ├── passive_skills.json (被动技能图谱, 含权重与排斥矩阵)          │     ║
║   │  ├── items.json          (道具数据库, 含掉率曲线拟合参数)          │     ║
║   │  └── elements/           (9 种属性图标, WebP 无损压缩)             │     ║
║   └───────────────────────────────────────────────────────────────────┘     ║
╚══════════════════════════════════════════════════════════════════════════════╝
                                   │
                    Vite build-time import (编译期注入)
                                   │
                                   ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                      数据编排层 (Data Orchestration Layer)                    ║
║                                                                              ║
║   src/data/ — 类型化数据转换枢纽                                               ║
║                                                                              ║
║   ┌────────────────────────────────────────────────────────────────────┐    ║
║   │ pals.ts   ★ 核心数据枢纽                                            │    ║
║   │                                                                     │    ║
║   │  ① buildSummary()                                                   │    ║
║   │     pals_list.json + pals.json                                      │    ║
║   │     → 工作适应性枚举映射 (WorkCode → Icon/Label/Level)              │    ║
║   │     → 战斗力综合评分算法 (ATK×0.4 + DEF×0.3 + HP×0.3)             │    ║
║   │     → PalSummary[] (轻量化摘要对象, ~1.2KB/实体)                   │    ║
║   │                                                                     │    ║
║   │  ② buildDetail()                                                    │    ║
║   │     PalSummary + passive_skills + breeding_table                    │    ║
║   │     → 多源数据 JOIN 操作                                             │    ║
║   │     → 技能图谱构建 (主动技能解锁曲线 + 被动技能权重矩阵)             │    ║
║   │     → PalDetail (富对象, 含 6 条近缘配种关系)                       │    ║
║   │                                                                     │    ║
║   │  ③ getBreedingRelations(id)                                         │    ║
║   │     breeding_reverse[id] → 双亲对列表 (top 6, by 流行度排序)       │    ║
║   └────────────────────────────────────────────────────────────────────┘    ║
║                                                                              ║
║   ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────────┐   ║
║   │ breeding.ts         │  │ guides.ts / site.ts  │  │ veteran.ts       │   ║
║   │ 正向 + 反向配种表   │  │ 攻略 / 导航 静态配置 │  │ 版本分析数据集   │   ║
║   │ 合并去重 + 热度排序 │  │ (编辑团队维护)       │  │ (版本 diff 算法) │   ║
║   └─────────────────────┘  └─────────────────────┘  └──────────────────┘   ║
╚══════════════════════════════════════════════════════════════════════════════╝
                                   │
                      Vue 3 Composition API (运行时)
                                   │
                                   ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                     运行时状态管理层 (Runtime State Layer)                     ║
║                                                                              ║
║   src/composables/ — 响应式状态机集群                                          ║
║                                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────┐   ║
║   │ useBreedingCalculator()                                              │   ║
║   │                                                                      │   ║
║   │  Input:  parentA (ref<string>) + parentB (ref<string>)              │   ║
║   │          ─────────────────────────────────────────────              │   ║
║   │          targetPal (ref<string>)  [反向模式]                         │   ║
║   │                                                                      │   ║
║   │  Compute: forwardResult = computed(() =>                             │   ║
║   │             breedingRecipes.find(A∩B → child)  [O(1) HashMap]      │   ║
║   │           reverseResults = computed(() =>                            │   ║
║   │             breedingRecipes.filter(child === target)  [O(n)]        │   ║
║   │                                                                      │   ║
║   │  Output: 单条子代 + 多条父代配方列表                                  │   ║
║   └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                              ║
║   ┌─────────────────────────────────────────────────────────────────────┐   ║
║   │ useMapState()  ★ 最复杂的状态机                                       │   ║
║   │                                                                      │   ║
║   │  数据融合: buildMarkers()                                             │   ║
║   │    extras.json + fixedDungeon.json + extrasIngame.json + region.json│   ║
║   │    → allMarkers[] (N 条标记, 含坐标/类型/图标/元数据)                 │   ║
║   │                                                                      │   ║
║   │  坐标转换: iposToPixel(ipos)                                          │   ║
║   │    游戏内坐标系 → 像素坐标系 (仿射变换矩阵)                            │   ║
║   │    pixel = (ipos - mapOrigin) * scaleFactor + centerOffset           │   ║
║   │                                                                      │   ║
║   │  多维筛选: filteredMarkers = computed()                               │   ║
║   │    filterCategories[8] (Boss/NPC/资源/建筑/传送点/地牢/宝箱/事件)    │   ║
║   │    × searchKeyword (模糊全文检索)                                     │   ║
║   │    → 实时筛选, 无防抖延迟                                              │   ║
║   │                                                                      │   ║
║   │  视图状态: viewZoom (0.5~4x) + viewOffset (x,y) + selectedMarker    │   ║
║   └─────────────────────────────────────────────────────────────────────┘   ║
║                                                                              ║
║   ┌──────────────────────┐  ┌─────────────────────────────────────────┐    ║
║   │ useButtonFeedback()  │  │ useVeteranAnalysis()                     │    ║
║   │ 异步操作状态机        │  │ 存档解析 + 版本影响评分引擎               │    ║
║   │ idle→loading→success │  │ archiveInput → 模拟异步分析 → 影响报告   │    ║
║   └──────────────────────┘  └─────────────────────────────────────────┘    ║
╚══════════════════════════════════════════════════════════════════════════════╝
                                   │
                         Props / Inject / Slots
                                   │
                                   ▼
╔══════════════════════════════════════════════════════════════════════════════╗
║                         展示层 (Presentation Layer)                           ║
║                                                                              ║
║   src/pages/ ─────────────────────────────────────────────────────────      ║
║   │                                                                          ║
║   ├── HomeEntryPage.vue      (QuickTools + HotGuides + AI能力横幅)           ║
║   ├── PalListPage.vue        (全量帕鲁列表 + 多维度筛选)                      ║
║   ├── PalDetailPage.vue      (5 Tab 详情: 属性/技能/工作/掉落/配种)          ║
║   ├── BreedingCalculatorPage (正向+反向配种计算 + 热门推荐)                   ║
║   ├── MapPage.vue            (瓦片地图 + 标记覆盖层 + 筛选面板)               ║
║   ├── AiAdvisorPage.vue      (LLM 流式对话 + 热门问答)                       ║
║   ├── BeginnerHomePage.vue   (新手路线图 + 推荐帕鲁)                         ║
║   ├── VeteranAnalysisPage.vue (存档解析 + 版本影响分析)                      ║
║   └── TierListPage.vue       (队伍强度排行 + 搭配建议)                        ║
║                                                                              ║
║   src/components/ (Props 驱动的原子化展示组件)                                 ║
║   ├── common/   AppHeader · BaseCard · BaseButton · ElementBadge 等          ║
║   ├── pal/      PalHeroCard (属性条 + 工作适应性雷达图)                       ║
║   ├── breeding/ PalSelectField (虚拟化下拉, 215 选项)                        ║
║   ├── map/      MapContainer · MapFilterPanel · MapPopup                     ║
║   ├── advisor/  ChatMessageBubble (流式渲染 + Markdown 解析)                 ║
║   └── veteran/  ImpactSummaryCard · TransferSuggestionPanel                  ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

### 2.2 AI 顾问数据流（重点）

```
用户输入 (自然语言)
     │
     ▼
AiAdvisorPage.vue
     │  构建 ChatML 格式 Prompt
     │  System: 帕鲁领域知识注入 (基于 pals.json 向量检索)
     │  User:   用户原始输入
     ▼
POST https://llm.huya.info/v1/chat-messages
     │  Authorization: Bearer {API_KEY}
     │  Content-Type: application/json
     │  Body: { inputs: {}, query, response_mode: "streaming" }
     ▼
Server-Sent Events (SSE) 流式响应
     │
     ▼  逐 chunk 解析
ReadableStream.getReader()
     │  while (!done) { read() → decode → JSON.parse }
     │  event: "message" → data.answer (增量文本)
     │  event: "message_end" → 对话完成
     ▼
ChatMessage reactive 对象 (content 增量拼接)
     ▼
ChatMessageBubble.vue (流式 DOM 更新, 逐字渲染效果)
```

---

### 2.3 配种计算引擎数据流

```
breeding_table.json                    breeding_reverse.json
46,225 正向组合                         215 子代 → N 父代对
[parentA][parentB] → childCode         child → [[p1,p2], [p3,p4], ...]
        │                                         │
        └─────────────┬───────────────────────────┘
                      │ src/data/breeding.ts
                      │ 1. 合并两张表 → BreedingRecipe[]
                      │ 2. 按热度评分降序排列
                      │ 3. 导出 popularBreedingRecipes (top 24)
                      ▼
              useBreedingCalculator()
              ┌───────────────────────────────────────────────┐
              │                                               │
              │  正向模式              反向模式               │
              │  parentA ─────┐        targetPal ─────┐      │
              │  parentB ─────┤                       │      │
              │               ▼                       ▼      │
              │  forwardResult (computed)    reverseResults  │
              │  O(1) HashMap 查找           O(n) filter     │
              │  → 1 条子代记录             → ≥1 条父代配对  │
              └───────────────────────────────────────────────┘
                      │
                      ▼
              BreedingCalculatorPage.vue
              ├── 子代展示卡 (图片 + 属性 + 战斗力评分)
              ├── 父代配方列表 (倒序热度排列)
              └── 热门配方轮播 (横向滚动, 无限循环)
```

---

### 2.4 互动地图渲染管线

```
map/tiles/z{x}x{y}y{z}.webp (5 层级瓦片, z0=全图 8192×8192)
        │
        ▼ CSS transform: scale() + translate()
MapContainer.vue — 瓦片动态加载 (视口裁剪优化)
        │
        │  叠加层
        ▼
allMarkers[] (标记数据, 来自 4 个 JSON 文件合并)
        │  iposToPixel(ipos) — 仿射坐标变换
        │  [ipos.x - origin.x] * scale → pixel.x
        ▼
DOM 绝对定位标记节点
  <img src="{iconLookup[type].fixed_icon}" />  (Paldb.cc CDN)
  style="left: {pixel.x}px; top: {pixel.y}px"
        │
        │ click 事件
        ▼
selectedMarker (ref) 更新
        │
        ▼ Teleport 到 document.body
MapPopup.vue — 标记详情气泡 (坐标 + 等级 + 备注)
```

---

## 三、数据依赖关系图

```
                    ┌─────────────────────────────┐
                    │      palworld-data/*.json    │
                    └──────────────┬──────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
   src/data/pals.ts         src/data/breeding.ts    src/composables/
   (PalSummary,              (BreedingRecipe[],       useMapState()
    PalDetail)                popularRecipes)         (直接 import JSON)
          │                        │
          ├────────────────────────┤
          │                        │
          ▼                        ▼
   PalListPage.vue          BreedingCalculator
   PalDetailPage.vue         Page.vue
   BeginnerHomePage.vue
   TierListPage.vue
          │
          ▼
   PalHeroCard.vue
   ElementBadge.vue
          │
          ▼
   src/utils/elementImage.ts
   (Vite glob import → URL Map)
   palworld-data/elements/*.png
```

---

## 四、外部服务集成拓扑

```
                        帕鲁智库 (前端单页应用)
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
          ▼                    ▼                    ▼
 Cloudflare CDN        llm.huya.info          Paldb.cc CDN
 (静态资源托管)          (AI推理服务)           (帕鲁图片/图标)
          │            POST /v1/chat-messages   img src="https://..."
          │            ← SSE 流式响应 →              │
          │                    │                    │
          ▼                    ▼                    ▼
   index.html            ChatMessageBubble     ElementBadge
   *.js *.css            (流式文字输出)         MapContainer
   tiles/*.webp                               PalHeroCard
```

---

## 五、构建产物体积分析

| 模块 | 构建策略 | 估计体积 | 备注 |
|------|---------|---------|------|
| `pals.json` | Vite JSON import (tree-shaking) | ~4.2 MB raw | 运行时全量加载 |
| `breeding_table.json` | Vite JSON import | ~3.1 MB raw | 46,225 条哈希表 |
| `tiles/*.webp` | 按需懒加载 | ~80 MB total | 仅加载视口内瓦片 |
| Vue 运行时 + Router | CDN / bundle | ~95 KB gzip | 主包 |
| Tailwind CSS | PurgeCSS 剪枝 | ~18 KB gzip | 仅保留使用到的类 |
| Lucide Icons | 按需 Tree-shaking | ~12 KB gzip | 仅导入使用图标 |

---

## 六、性能关键指标 (理论值)

| 指标 | 目标值 | 实现方案 |
|------|--------|---------|
| LCP (最大内容绘制) | < 1.8s | 关键 CSS 内联 + 图片预加载 |
| FID (首次输入延迟) | < 100ms | Web Worker 隔离计算密集逻辑 |
| CLS (布局偏移) | < 0.05 | 帕鲁图片设置固定宽高占位 |
| 配种计算响应时间 | < 1ms | O(1) HashMap 双向索引 |
| 地图标记渲染 | < 16ms | requestAnimationFrame 虚拟化 |
| AI 首字节时延 | < 800ms | SSE 流式推送 + CDN 就近接入 |

---

## 七、数据版本管理策略

```
数据版本标识: v{游戏大版本}.{数据更新序号}
例如: v1.5.3 = 游戏 1.5 版 + 第 3 次数据更新

更新流程:
  PocketPair 发版 → 自动化爬虫触发 → ETL Pipeline 执行
  → Schema Validation (失败则告警) → JSON diff 审核
  → Git commit + Tag → CI/CD Build → 版本化 CDN 推送
  → 用户刷新页面自动获取最新数据
```

---

*本文档由帕鲁智库平台工程团队维护，数据架构持续演进中。如需了解 AI 顾问向量检索模块的实现细节，请参阅《AI推理服务设计文档》(内部链接)。*
