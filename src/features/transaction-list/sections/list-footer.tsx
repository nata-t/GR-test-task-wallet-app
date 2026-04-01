import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"

import { Separator } from "@/components/ui/separator"
import {
  CARD_LIMIT,
  formatMoney,
  formatTransactionTimeLabel,
} from "../lib/format"

export function ListFooter() {
  return (
    <div className="mt-6 text-xs text-muted-foreground">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCreditCard} />
        <span>Limit {formatMoney(CARD_LIMIT)}</span>
        <Separator orientation="vertical" className="h-3" />
        <span className="tabular-nums">
          {formatTransactionTimeLabel(new Date().toISOString())}
        </span>
      </div>
    </div>
  )
}
