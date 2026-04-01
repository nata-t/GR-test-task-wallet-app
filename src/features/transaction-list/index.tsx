import { useState } from "react"

import { getLatestTransactions } from "@/lib/transactions"
import { getTodayDailyPoints } from "@/lib/dailyPoints"

import { CARD_LIMIT } from "./lib/format"
import { LatestTransactions } from "./sections/latest-transactions"
import { ListFooter } from "./sections/list-footer"
import { SummaryCards } from "./sections/summary-cards"

export default function Index() {
  const [balance] = useState(() => {
    return Math.round((Math.random() * (CARD_LIMIT - 1) + 1) * 100) / 100
  })
  const available = Math.max(0, CARD_LIMIT - balance)
  const todayPoints = getTodayDailyPoints()
  const latest = getLatestTransactions(10)

  return (
    <div className="min-h-svh bg-muted/30 px-4 py-6">
      <div className="mx-auto w-full max-w-[420px]">
        <SummaryCards
          balance={balance}
          available={available}
          todayPoints={todayPoints}
        />
        <LatestTransactions transactions={latest} />
        <ListFooter />
      </div>
    </div>
  )
}
