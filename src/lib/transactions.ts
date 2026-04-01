import rawTransactions from "./data/transactions.json"
import type { Transaction } from "./types"

const transactions = rawTransactions as Transaction[]

export function getAllTransactions(): Transaction[] {
  return [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getLatestTransactions(limit = 10): Transaction[] {
  return getAllTransactions().slice(0, limit)
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((t) => t.id === id)
}
