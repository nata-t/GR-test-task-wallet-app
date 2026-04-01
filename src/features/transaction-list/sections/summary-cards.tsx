import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck } from "@fortawesome/free-solid-svg-icons"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatMoney } from "../lib/format"
import { formatPoints } from "@/lib/dailyPoints"

type SummaryCardsProps = {
  balance: number
  available: number
  todayPoints: number
}

export function SummaryCards({
  balance,
  available,
  todayPoints,
}: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Card className="col-span-1 gap-0 p-3">
        <CardHeader className="p-0">
          <CardTitle className="p-0 text-sm text-muted-foreground">
            Card Balance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-3xl font-semibold tabular-nums">
            {formatMoney(balance)}
          </div>
          <div className="mt-1 text-sm text-muted-foreground">
            {formatMoney(available)} Available
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 row-span-2 gap-0 p-3">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold">
            No Payment Due
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground">
            You&apos;ve paid your balance.
          </div>
          <div className="mt-6 flex items-center justify-end">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <FontAwesomeIcon icon={faCheck} className="text-xl" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1 gap-0 p-3">
        <CardHeader className="p-0">
          <CardTitle className="text-base font-semibold">
            Daily Points
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="text-sm text-muted-foreground tabular-nums">
            {formatPoints(todayPoints)}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
