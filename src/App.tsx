import { useState } from "react"
import { LoginPage } from "@/pages/LoginPage"
import { SignUpPage } from "@/pages/SignUpPage"

type AuthView = "login" | "signup"

function App() {
  const [view, setView] = useState<AuthView>("login")

  if (view === "signup") {
    return <SignUpPage onNavigateToLogin={() => setView("login")} />
  }

  return <LoginPage onNavigateToSignUp={() => setView("signup")} />
}

export default App
