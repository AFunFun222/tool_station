import palsListRaw from '../../palworld-data/pals_list.json'
import palsRaw from '../../palworld-data/pals.json'
import breedingTableRaw from '../../palworld-data/breeding_table.json'
import passiveSkillsRaw from '../../palworld-data/passive_skills.json'
import type { PalDetail, PalSummary, PalWorkSuitabilityEntry } from '@/types/pal'

type RawPalListItem = {
  id: number
  name: string
  link: string
  element: string
  work_suitability?: Record<string, number | undefined>
  icon_url: string
  detail_url?: string
}

type RawDropItem = {
  item: string
  item_link?: string
  quantity?: string
  probability?: string
}

type RawPalDetail = RawPalListItem & {
  stats?: Record<string, string | number>
  partner_skill?: string
  partner_skill_desc?: string
  active_skills?: Array<{
    level: number
    name: string
    element: string
    cooltime: number
    power: number
    description: string
  }>
  drops?: Array<string | RawDropItem>
}

type RawPassiveSkill = {
  name: string
  rank: number
  effects: string[]
}

const palsList = palsListRaw as RawPalListItem[]
const pals = palsRaw as RawPalDetail[]
const passiveSkills = passiveSkillsRaw as RawPassiveSkill[]
const breedingTable = breedingTableRaw as {
  code_to_name: Record<string, string>
  breeding_table?: Record<string, Record<string, string>>
}

const elementLabelMap: Record<string, string> = {
  Neutral: 'None',
  Grass: 'Grass',
  Fire: 'Fire',
  Water: 'Water',
  Electric: 'Electric',
  Ice: 'Ice',
  Ground: 'Ground',
  Dark: 'Dark',
  Dragon: 'Dragon',
}

const workLabelMap: Record<string, string> = {
  Kindling: 'Kindling',
  Watering: 'Watering',
  Planting: 'Planting',
  GeneratingElectricity: 'Generating Electricity',
  Handiwork: 'Handiwork',
  Gathering: 'Gathering',
  Lumbering: 'Lumbering',
  Mining: 'Mining',
  MedicineProduction: 'Medicine Production',
  Cooling: 'Cooling',
  Transporting: 'Transporting',
  Farming: 'Ranching',
}

const accentPalette = ['#4ECDC4', '#38BDF8', '#8B5CF6', '#FF8C42', '#F472B6', '#A3E635']

const normalizeId = (link: string) => link.toLowerCase().replace(/[^a-z0-9]+/g, '-')

const passiveSkillMap = new Map(passiveSkills.map((skill) => [skill.name.toLowerCase(), skill]))
const palDetailMap = new Map(pals.map((pal) => [pal.link, pal]))
const palDetailByIdMap = new Map(pals.map((pal) => [normalizeId(pal.link), pal]))

const formatNumber = (id: number) => `#${String(id).padStart(3, '0')}`

const mapElement = (element: string) => elementLabelMap[element] ?? element

const mapWorkSuitability = (workSuitability?: Record<string, number | undefined>): PalWorkSuitabilityEntry[] =>
  Object.entries(workSuitability ?? {})
    .filter(([, level]) => Number(level) > 0)
    .map(([key, level]) => ({
      key,
      label: workLabelMap[key] ?? key,
      level: Number(level),
    }))
    .sort((a, b) => b.level - a.level)

const getAccent = (id: number) => accentPalette[id % accentPalette.length]

const getRecommendation = (pal: RawPalDetail | RawPalListItem, workSuitability: PalWorkSuitabilityEntry[]) => {
  const topWork = workSuitability[0]
  const rarity = Number((pal as RawPalDetail).stats?.Rarity ?? 1)

  if (topWork) {
    return `Good at ${topWork.label} Lv${topWork.level}, suitable for ${rarity >= 4 ? 'mid-late game focused training' : 'early-mid game exploration and support'}.`
  }

  return `${mapElement(pal.element)} element Pal, suitable for supplementing team element coverage and Pokedex collection.`
}

const getBattleStats = (detail?: RawPalDetail) => {
  const attack = Number(detail?.stats?.Attack ?? 0)
  const defense = Number(detail?.stats?.Defense ?? 0)
  const workSpeed = Number(detail?.stats?.['Work Speed'] ?? 0)
  const support = Number(detail?.stats?.Support ?? 0)

  return {
    battle: Math.min(100, Math.round((attack + defense) / 2)),
    gather: Math.min(100, Math.round((support + workSpeed) / 2)),
    work: Math.min(100, Math.round(workSpeed)),
  }
}

const buildSummary = (pal: RawPalListItem): PalSummary => {
  const detail = palDetailMap.get(pal.link)
  const workSuitability = mapWorkSuitability(pal.work_suitability)
  const rarity = Number(detail?.stats?.Rarity ?? 1)

  return {
    id: normalizeId(pal.link),
    name: pal.name,
    number: formatNumber(pal.id),
    rarity,
    elements: [mapElement(pal.element)],
    avatar: pal.icon_url,
    accent: getAccent(pal.id),
    recommendation: getRecommendation(detail ?? pal, workSuitability),
    stats: getBattleStats(detail),
    versionNote: pal.name.includes('Noct') || pal.name.includes('Cryst') || pal.name.includes('Ignis') ? 'Variant forms available' : undefined,
    workSuitability,
    detailUrl: pal.detail_url,
  }
}

export const palOptions: PalSummary[] = palsList.map(buildSummary)

export const recommendedPals: PalSummary[] = [...palOptions]
  .sort((a, b) => (b.stats?.work ?? 0) + (b.stats?.gather ?? 0) - ((a.stats?.work ?? 0) + (a.stats?.gather ?? 0)))
  .slice(0, 6)

const breedingEntries = Object.entries(breedingTable.breeding_table ?? {}).flatMap(([parentA, children]) =>
  Object.entries(children).map(([parentB, child]) => ({ parentA, parentB, child })),
)

const palAvatarByName = new Map(palsList.map((p) => [p.name, p.icon_url]))

const getPalAvatar = (name: string) => palAvatarByName.get(name) ?? ''

const getBreedingRelations = (palName: string) =>
  breedingEntries
    .filter(({ child }) => (breedingTable.code_to_name[child] ?? child) === palName)
    .slice(0, 6)
    .map(({ parentA, parentB, child }) => {
      const parentAName = breedingTable.code_to_name[parentA] ?? parentA
      const parentBName = breedingTable.code_to_name[parentB] ?? parentB
      const childName = breedingTable.code_to_name[child] ?? child
      return {
        formula: `${childName} = ${parentAName} × ${parentBName}`,
        route: `/breeding?parentA=${normalizeId(parentAName)}&parentB=${normalizeId(parentBName)}`,
        parentA: { name: parentAName, avatar: getPalAvatar(parentAName) },
        parentB: { name: parentBName, avatar: getPalAvatar(parentBName) },
        child: { name: childName, avatar: getPalAvatar(childName) },
      }
    })

const cleanSkillDesc = (desc?: string) => {
  if (!desc) return 'No passive skill description available.'
  // Truncate the pure description part before "Technology XX Lv."
  const cutIdx = desc.search(/\s+Technology\s+\d+\s+Lv\./i)
  return cutIdx > 0 ? desc.slice(0, cutIdx).trim() : desc.trim()
}

const getPassiveSkill = (detail: RawPalDetail) => {
  const partnerSkillName = detail.partner_skill ?? 'Partner Skill'
  const matchedPassive = passiveSkillMap.get(partnerSkillName.toLowerCase())

  return {
    name: partnerSkillName,
    description: matchedPassive?.effects.join('; ') ?? cleanSkillDesc(detail.partner_skill_desc),
  }
}

const getDrops = (detail: RawPalDetail) =>
  (detail.drops ?? []).slice(0, 6).map((drop) => {
    if (typeof drop === 'string') return { name: drop, rate: 'Not specified' }
    return {
      name: drop.item,
      rate: drop.probability ? `${drop.probability}` : 'Not specified',
    }
  })

const buildDetail = (summary: PalSummary): PalDetail => {
  const detail = palDetailByIdMap.get(summary.id) ?? pals.find((item) => normalizeId(item.link) === summary.id)
  const activeSkills = detail?.active_skills ?? []
  const topSkill = activeSkills[0]
  const breedingRelations = getBreedingRelations(summary.name)

  return {
    ...summary,
    description: detail?.partner_skill_desc ?? `${summary.name} is a ${summary.elements.join('/')} element Pal, suitable for combat, work, and Pokedex collection.`,
    passiveSkill: getPassiveSkill(detail ?? { ...summary, partner_skill: 'Partner Skill', partner_skill_desc: 'No description' } as unknown as RawPalDetail),
    activeSkill: topSkill
      ? {
          name: topSkill.name,
          description: topSkill.description,
          power: `Power ${topSkill.power} · CD ${topSkill.cooltime}s`,
        }
      : {
          name: 'No skill data',
          description: 'Active skills are not provided in the current dataset.',
        },
    statsPanel: [
      { label: 'HP', value: Math.min(100, Number(detail?.stats?.Health ?? 0)) },
      { label: 'Attack', value: Math.min(100, Number(detail?.stats?.Attack ?? 0)) },
      { label: 'Defense', value: Math.min(100, Number(detail?.stats?.Defense ?? 0)) },
      { label: 'Work Speed', value: Math.min(100, Number(detail?.stats?.['Work Speed'] ?? 0)) },
    ],
    workSuitability: summary.workSuitability ?? [],
    drops: getDrops(detail ?? ({} as RawPalDetail)),
    activeSkills: activeSkills.map((skill) => ({
      level: skill.level,
      name: skill.name,
      element: mapElement(skill.element),
      power: skill.power,
      cooltime: skill.cooltime,
      description: skill.description,
    })),
    breedingRelations:
      breedingRelations.length > 0
        ? breedingRelations
        : [
            {
              formula: `${summary.name} has many breeding paths, please use the calculator to query by target.`,
              route: '/breeding',
              parentA: { name: summary.name, avatar: summary.avatar },
              parentB: { name: '?', avatar: '' },
              child: { name: summary.name, avatar: summary.avatar },
            },
          ],
  }
}

export const palDetails: Record<string, PalDetail> = Object.fromEntries(
  palOptions.map((summary) => [summary.id, buildDetail(summary)]),
)
