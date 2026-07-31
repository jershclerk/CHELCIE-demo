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
    <div className="flex min-h-screen w-full items-center justify-center bg-chelcie-gray6 px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[360px] flex-col gap-4 rounded-[18px] bg-white p-8 text-center shadow-sm"
      >
        <span className="font-suisse text-2xl font-medium text-black">CHELCIE</span>
        <p className="text-[13px] tracking-[-0.08px] text-black/60">
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
          className="rounded-full border border-chelcie-separator bg-[#fafafc] px-4 py-2 text-center text-[13px] tracking-[-0.08px] text-black placeholder:text-black/40 focus:ring-2 focus:ring-chelcie-primary-button/30 focus:outline-none"
        />
        {error && <p className="text-[12px] font-medium text-red-500">That password isn't right — try again.</p>}
        <button
          type="submit"
          className="rounded-full bg-chelcie-primary-button px-4 py-2 text-[13px] font-semibold text-white transition-opacity hover:opacity-90 active:scale-95"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
