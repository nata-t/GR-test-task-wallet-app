export type TransactionType = "payment" | "credit"

export type Transaction = {
  id: string
  type: TransactionType
  amount: number
  name: string
  description: string
  date: string
  pending: boolean
  authorizedUser?: string
  iconKey: string
}
