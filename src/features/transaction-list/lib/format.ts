export const CARD_LIMIT = 1500

export function formatMoney(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function isWithinLastWeek(date: Date, now: Date) {
  const ms = now.getTime() - date.getTime()
  return ms >= 0 && ms < 7 * 24 * 60 * 60 * 1000
}

export function formatTransactionDateLabel(isoDate: string, now = new Date()) {
  const date = new Date(isoDate)
  if (isWithinLastWeek(date, now)) {
    return new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
  }).format(date)
}

export function formatTransactionTimeLabel(isoDate: string) {
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat("en-US", {
    month: "numeric",
    day: "numeric",
    year: "2-digit",
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}
