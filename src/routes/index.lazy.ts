import { createLazyFileRoute } from "@tanstack/react-router"
import TransactionList from "@/features/transaction-list"

export const Route = createLazyFileRoute("/")({
  component: TransactionList,
})
