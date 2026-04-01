import { formatDateTime, formatMoney } from "../lib/format"
import type { Transaction } from "@/lib/types"

type TransactionHeroProps = {
  tx: Transaction
}

export function TransactionHero({ tx }: TransactionHeroProps) {
  const amountText =
    tx.type === "payment"
      ? `+${formatMoney(tx.amount)}`
      : formatMoney(tx.amount)

  return (
    <div className="mt-6 text-center">
      <div className="text-5xl font-semibold tabular-nums">{amountText}</div>
      <div className="mt-3 text-base text-muted-foreground">{tx.name}</div>
      <div className="mt-1 text-sm text-muted-foreground">
        {formatDateTime(tx.date)}
      </div>
    </div>
  )
}
