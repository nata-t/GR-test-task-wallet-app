import { Link } from "@tanstack/react-router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faApple } from "@fortawesome/free-brands-svg-icons"
import {
  faBagShopping,
  faBullseye,
  faBuildingColumns,
  faCarSide,
  faChevronRight,
  faSimCard,
  faStore,
} from "@fortawesome/free-solid-svg-icons"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"

import type { Transaction } from "@/lib/types"

import { formatMoney, formatTransactionDateLabel } from "../lib/format"

function iconForKey(iconKey: string): IconDefinition {
  switch (iconKey) {
    case "apple":
      return faApple
    case "bullseye":
      return faBullseye
    case "bank":
      return faBuildingColumns
    case "car":
      return faCarSide
    case "sim":
      return faSimCard
    case "store":
      return faStore
    default:
      return faBagShopping
  }
}

function stableIndexFromString(value: string, modulo: number) {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash % modulo
}

const ICON_BACKGROUNDS = [
  "bg-zinc-800",
  "bg-slate-800",
  "bg-neutral-800",
  "bg-stone-800",
  "bg-gray-800",
] as const

function IconBadge({ tx }: { tx: Transaction }) {
  const bg =
    ICON_BACKGROUNDS[stableIndexFromString(tx.id, ICON_BACKGROUNDS.length)]
  return (
    <div
      className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${bg} text-white`}
      aria-hidden="true"
    >
      <FontAwesomeIcon icon={iconForKey(tx.iconKey)} className="text-[17px]" />
    </div>
  )
}

export function TransactionRow({ tx }: { tx: Transaction }) {
  const dateLabel = formatTransactionDateLabel(tx.date)
  const subtitle = tx.authorizedUser
    ? `${tx.authorizedUser} – ${dateLabel}`
    : dateLabel

  const description = tx.pending
    ? `Pending - ${tx.description}`
    : tx.description
  const amountText =
    tx.type === "payment"
      ? `+${formatMoney(tx.amount)}`
      : formatMoney(tx.amount)

  return (
    <Link
      to="/transaction/$transactionId"
      params={{ transactionId: tx.id }}
      className="flex min-w-0 w-full items-center gap-3 px-4 py-3"
    >
      <IconBadge tx={tx} />

      <div className="min-w-0 flex-1 overflow-hidden">
        <div className="font-medium leading-snug">{tx.name}</div>
        <div
          className="truncate text-sm leading-snug text-muted-foreground"
          title={description}
        >
          {description}
        </div>
        <div className="mt-0.5 text-sm leading-snug text-muted-foreground">
          {subtitle}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 pl-1">
        <span className="text-right font-medium tabular-nums">{amountText}</span>
        <FontAwesomeIcon
          icon={faChevronRight}
          className="size-3.5 shrink-0 text-muted-foreground/80"
        />
      </div>
    </Link>
  )
}
