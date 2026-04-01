import { createLazyFileRoute } from "@tanstack/react-router"
import TransactionDetail from "@/features/transaction-detail"

export const Route = createLazyFileRoute("/transaction/$transactionId")({
  component: TransactionDetail,
})
