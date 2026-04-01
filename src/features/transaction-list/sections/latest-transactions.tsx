import { Card, CardContent } from "@/components/ui/card"
import type { Transaction } from "@/lib/types"

import { TransactionRow } from "./transaction-row"

type LatestTransactionsProps = {
  transactions: Transaction[]
}

export function LatestTransactions({ transactions }: LatestTransactionsProps) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold">Latest Transactions</h2>
      <Card className="mt-3 overflow-hidden py-0">
        <CardContent className="px-0">
          <div className="divide-y">
            {transactions.map((tx) => (
              <div key={tx.id}>
                <TransactionRow tx={tx} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
