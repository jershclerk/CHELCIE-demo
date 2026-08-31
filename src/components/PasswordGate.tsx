import { useState, type FormEvent, type ReactNode } from "react"

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
    <div className="bg-scene flex min-h-screen w-full items-center justify-center px-4 text-ink">
      <form
        onSubmit={handleSubmit}
        className="border-ink/10 bg-ink/5 flex w-full max-w-[360px] flex-col gap-4 rounded-[18px] border p-8 text-center backdrop-blur-xl"
      >
        <span className="font-suisse text-2xl font-medium text-ink">CHELCIE</span>
        <p className="text-ink/60 text-[13px] tracking-[-0.08px]">
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
          className="border-ink/15 bg-ink/5 text-ink placeholder:text-ink/40 focus:ring-neon/40 rounded-full border px-4 py-2 text-center text-[13px] tracking-[-0.08px] focus:ring-2 focus:outline-none"
        />
        {error && <p className="text-[12px] font-medium text-red-400">That password isn't right — try again.</p>}
        <button
          type="submit"
          className="bg-neon text-neon-text rounded-full px-4 py-2 text-[13px] font-semibold transition-opacity hover:opacity-90 active:scale-95"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
