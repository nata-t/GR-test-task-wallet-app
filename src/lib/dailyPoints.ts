const SEASON_STARTS = {
  spring: { month: 2, day: 1 }, // Mar 1
  summer: { month: 5, day: 1 }, // Jun 1
  autumn: { month: 8, day: 1 }, // Sep 1
  winter: { month: 11, day: 1 }, // Dec 1
} as const

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function addDays(date: Date, days: number) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function getSeasonStart(date: Date): Date {
  const year = date.getFullYear()

  const spring = new Date(
    year,
    SEASON_STARTS.spring.month,
    SEASON_STARTS.spring.day
  )
  const summer = new Date(
    year,
    SEASON_STARTS.summer.month,
    SEASON_STARTS.summer.day
  )
  const autumn = new Date(
    year,
    SEASON_STARTS.autumn.month,
    SEASON_STARTS.autumn.day
  )
  const winter = new Date(
    year,
    SEASON_STARTS.winter.month,
    SEASON_STARTS.winter.day
  )

  const d = startOfDay(date)

  if (d >= winter) return winter
  if (d >= autumn) return autumn
  if (d >= summer) return summer
  if (d >= spring) return spring

  // Jan/Feb belong to winter that started last year
  return new Date(
    year - 1,
    SEASON_STARTS.winter.month,
    SEASON_STARTS.winter.day
  )
}

export function getDayOfSeason(date: Date): number {
  const d = startOfDay(date)
  const seasonStart = startOfDay(getSeasonStart(d))
  const diffMs = d.getTime() - seasonStart.getTime()
  const diffDays = Math.floor(diffMs / (24 * 60 * 60 * 1000))
  return diffDays + 1
}

export function getDailyPointsForDayOfSeason(dayOfSeason: number): number {
  if (dayOfSeason <= 1) return 2
  if (dayOfSeason === 2) return 3

  let p1 = 2 // day 1
  let p2 = 3 // day 2
  for (let day = 3; day <= dayOfSeason; day++) {
    const next = Math.round(p1 + 0.6 * p2)
    p1 = p2
    p2 = next
  }
  return p2
}

export function getTodayDailyPoints(now = new Date()): number {
  return getDailyPointsForDayOfSeason(getDayOfSeason(now))
}

export function formatPoints(points: number): string {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`
  }
  return `${Math.round(points)}`
}

export function getSeasonStartDate(now = new Date()): Date {
  return getSeasonStart(now)
}

export function getSeasonDaySequenceSample(now = new Date(), days = 5) {
  const start = getSeasonStartDate(now)
  return Array.from({ length: days }, (_, i) => {
    const date = addDays(start, i)
    const dayOfSeason = getDayOfSeason(date)
    return {
      date,
      dayOfSeason,
      points: getDailyPointsForDayOfSeason(dayOfSeason),
    }
  })
}
