import { useParams } from "@tanstack/react-router"

import { getTransactionById } from "@/lib/transactions"

import { BackLink } from "./sections/back-link"
import { TransactionNotFound } from "./sections/not-found"
import { TransactionDetailCard } from "./sections/transaction-detail-card"
import { TransactionHero } from "./sections/transaction-hero"

export default function Index() {
  const { transactionId } = useParams({ from: "/transaction/$transactionId" })
  const tx = getTransactionById(transactionId)

  if (!tx) {
    return <TransactionNotFound transactionId={transactionId} />
  }

  return (
    <div className="min-h-svh bg-muted/30 px-4 py-6">
      <div className="mx-auto w-full max-w-[420px]">
        <BackLink />
        <TransactionHero tx={tx} />
        <TransactionDetailCard tx={tx} />
      </div>
    </div>
  )
}
