import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider } from "@tanstack/react-router"
import { Suspense } from "react"

import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { QueryClient } from "@tanstack/react-query"
import { router } from "./router"

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Suspense fallback={<div>Loading…</div>}>
          <RouterProvider router={router} />
        </Suspense>{" "}
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)
