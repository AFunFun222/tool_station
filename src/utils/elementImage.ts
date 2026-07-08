/**
 * 帕鲁属性图标工具函数
 * 使用 Vite glob import 预加载 palworld-data/elements/ 下的所有属性图片
 */

// 使用 Vite glob 导入所有属性图片
const elementImageModules = import.meta.glob(
  '/palworld-data/elements/*.png',
  { eager: true, import: 'default' }
) as Record<string, string>

// 构建属性名（lowercase）到图片 URL 的映射
const elementImageMap: Record<string, string> = {}
for (const [path, url] of Object.entries(elementImageModules)) {
  const filename = path.split('/').pop()?.replace('.png', '') ?? ''
  if (filename) {
    elementImageMap[filename] = url
  }
}

/**
 * 根据属性名获取对应的图片 URL
 * @param element 属性名，如 'Fire', 'Water', 'Neutral' 等（大小写不敏感）
 * @returns 图片 URL 字符串，找不到时返回空字符串
 */
export const getElementImageUrl = (element: string): string => {
  return elementImageMap[element.toLowerCase()] ?? ''
}

/**
 * 属性颜色映射（用于背景色样式）
 */
export const elementColorMap: Record<string, string> = {
  fire: 'rgba(239, 68, 68, 0.2)',
  water: 'rgba(59, 130, 246, 0.2)',
  grass: 'rgba(34, 197, 94, 0.2)',
  electric: 'rgba(234, 179, 8, 0.2)',
  ice: 'rgba(99, 232, 240, 0.2)',
  ground: 'rgba(180, 120, 60, 0.2)',
  dark: 'rgba(139, 92, 246, 0.2)',
  dragon: 'rgba(99, 102, 241, 0.2)',
  neutral: 'rgba(148, 163, 184, 0.2)',
}

/**
 * 属性文字颜色映射
 */
export const elementTextColorMap: Record<string, string> = {
  fire: '#f87171',
  water: '#60a5fa',
  grass: '#4ade80',
  electric: '#facc15',
  ice: '#67e8f9',
  ground: '#d4a96a',
  dark: '#c084fc',
  dragon: '#818cf8',
  neutral: '#94a3b8',
}
