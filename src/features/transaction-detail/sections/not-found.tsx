import { BackLink } from "./back-link"

type NotFoundProps = {
  transactionId: string
}

export function TransactionNotFound({ transactionId }: NotFoundProps) {
  return (
    <div className="min-h-svh bg-muted/30 px-4 py-6">
      <div className="mx-auto w-full max-w-[420px]">
        <BackLink />
        <div className="mt-6 text-lg font-semibold">Transaction not found</div>
        <div className="mt-2 text-sm text-muted-foreground">
          The transaction id{" "}
          <span className="font-mono">{transactionId}</span> doesn&apos;t exist in
          the JSON data.
        </div>
      </div>
    </div>
  )
}
