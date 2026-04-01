import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBuildingColumns,
  faCheckCircle,
  faClock,
  faCreditCard,
  faReceipt,
  faUser,
} from "@fortawesome/free-solid-svg-icons"

import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatMoney } from "../lib/format"
import type { Transaction } from "@/lib/types"

type TransactionDetailCardProps = {
  tx: Transaction
}

export function TransactionDetailCard({ tx }: TransactionDetailCardProps) {
  const amountText =
    tx.type === "payment"
      ? `+${formatMoney(tx.amount)}`
      : formatMoney(tx.amount)
  const statusLabel = tx.pending ? "Pending" : "Approved"
  const statusIcon = tx.pending ? faClock : faCheckCircle

  return (
    <Card className="mt-6 py-0">
      <CardContent className="p-0">
        <div className="px-5 py-4">
          <div className="text-sm font-medium">Status: {statusLabel}</div>
          <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={statusIcon} />
            <span>{tx.pending ? "Awaiting finalization" : "Completed"}</span>
          </div>
        </div>

        <Separator />

        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium">Payment method</div>
            <FontAwesomeIcon
              icon={faCreditCard}
              className="text-muted-foreground"
            />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {tx.description}
          </div>
        </div>

        <Separator />

        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium">Type</div>
            <FontAwesomeIcon
              icon={faReceipt}
              className="text-muted-foreground"
            />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {tx.type === "payment" ? "Payment (top-up)" : "Credit (expense)"}
          </div>
        </div>

        <Separator />

        <div className="px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-medium">Authorized user</div>
            <FontAwesomeIcon icon={faUser} className="text-muted-foreground" />
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {tx.authorizedUser ?? "You"}
          </div>
        </div>

        <Separator />

        <div className="px-5 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="font-medium">Total</div>
            <div className="font-semibold tabular-nums">{amountText}</div>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <FontAwesomeIcon icon={faBuildingColumns} />
            <span className="truncate">Loaded from local JSON test data</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
