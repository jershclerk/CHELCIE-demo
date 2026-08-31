import { useState, type FormEvent, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

const DEMO_PASSWORD = "chelcie2026"
const SESSION_KEY = "chelcie-demo-unlocked"

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === "true")
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)

  if (unlocked) return <>{children}</>

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (value === DEMO_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true")
      setUnlocked(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="bg-background flex min-h-screen w-full items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="border-border bg-card flex w-full max-w-[360px] flex-col gap-4 rounded-2xl border p-8 text-center shadow-sm"
      >
        <span className="font-display text-foreground text-2xl font-medium">CHELCIE</span>
        <p className="text-muted-foreground text-[13px] tracking-[-0.08px]">
          This demo is password-protected. Enter the password to continue.
        </p>
        <input
          type="password"
          autoFocus
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setError(false)
          }}
          placeholder="Password"
          className="border-input bg-background text-foreground placeholder:text-muted-foreground focus:ring-ring rounded-full border px-4 py-2 text-center text-[13px] tracking-[-0.08px] focus:ring-2 focus:outline-none"
        />
        {error && <p className="text-destructive text-[12px] font-medium">That password isn't right — try again.</p>}
        <Button type="submit" className="w-full rounded-full">
          Enter
        </Button>
      </form>
    </div>
  )
}
