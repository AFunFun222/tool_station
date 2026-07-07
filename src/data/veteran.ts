import type { ChecklistItem, ImpactCard, ImpactDetail, NewContentCard, TransferSuggestion } from '@/types/analysis'

export const impactCards: ImpactCard[] = [
  {
    id: 'impact-1',
    title: '⚠️ 被削弱',
    palName: '空涡龙',
    note: '飞行速度下调15%，仍为T1坐骑',
    tone: 'red',
  },
  {
    id: 'impact-2',
    title: '✅ 仍然T0',
    palName: '杰诺多兰',
    note: '数值未变，新配种路径解锁',
    tone: 'green',
  },
  {
    id: 'impact-3',
    title: '🆕 推荐培养',
    palName: '莲花龙(新)',
    note: '世界树能量变异，水系T0',
    tone: 'blue',
  },
]

export const transferToNewSave: TransferSuggestion[] = [
  { name: '杰诺多兰', reason: '终局战斗与飞行兼备，1.0 仍是核心战力。', priority: '高' },
  { name: '空涡龙', reason: '虽然速度下调，但探索效率依旧领先。', priority: '高' },
  { name: '疾风隼', reason: '前中期过渡优秀，适合快速开图。', priority: '中' },
  { name: '圣光骑士', reason: '适配新区域 Boss 战，容错率高。', priority: '中' },
]

export const keepInOldSave: TransferSuggestion[] = [
  { name: '佩克龙', reason: '1.0 环境下被新水系帕鲁替代。', priority: '低' },
  { name: '覆海龙', reason: '工作适应性收益下降，旧档保留即可。', priority: '低' },
  { name: '雷鸣犬', reason: '新机制下泛用性不足。', priority: '低' },
]

export const newContentCards: NewContentCard[] = [
  { title: '世界树(新区域)', description: '终局探索区域，推荐 Lv55+。', route: '/veteran-analysis' },
  { title: '空岛云海(新区域)', description: '高空垂直探索，飞行坐骑必备。', route: '/veteran-analysis' },
  { title: '人帕一体(新机制)', description: '部分帕鲁可化身武器参与战斗。', route: '/advisor' },
  { title: '50+新帕鲁', description: '新增大量终局与功能型帕鲁。', route: '/pals/kongwolong' },
  { title: '禁猎区2.0', description: '新增能量屏障与巡逻无人机。', route: '/veteran-analysis' },
  { title: '多结局剧情', description: '完整主线补全，新增剧情分支。', route: '/veteran-analysis' },
]

export const impactDetails: ImpactDetail[] = [
  { name: '空涡龙', status: '削弱', description: '飞行速度-15%，耐力+10%，综合仍为T1坐骑', action: '查看替代方案' },
  { name: '杰诺多兰', status: '不变', description: '数值未变，新配种路径解锁', action: '保持培养' },
  { name: '疾风隼', status: '增强', description: '前中期骑乘体验优化，转向更灵活', action: '保持培养' },
  { name: '覆海龙', status: '削弱', description: '工作适应性收益下降，建议转功能位', action: '查看替代方案' },
  { name: '佩克龙', status: '新配种', description: '新增与莲花龙的联动配种路线', action: '查看替代方案' },
]

export const worldTreeChecklist: ChecklistItem[] = [
  { label: '推荐等级: Lv55+', checked: true },
  { label: '推荐坐骑: 空涡龙/杰诺多兰（飞行）', checked: true },
  { label: '推荐战斗帕鲁: 莲花龙(新) + 圣光骑士', checked: false },
  { label: '物资准备: 高级帕鲁球x20, 治疗药剂x10', checked: false },
]
