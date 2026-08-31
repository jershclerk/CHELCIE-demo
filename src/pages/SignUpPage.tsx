import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type SignUpPageProps = {
  onNavigateToLogin?: () => void
}

export function SignUpPage({ onNavigateToLogin }: SignUpPageProps) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40 px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader className="gap-2 text-center">
          <span className="font-display text-2xl">CHELCIE</span>
          <CardTitle className="text-base font-normal text-muted-foreground">
            Create your account
          </CardTitle>
          <CardDescription>Start mapping your funding pipeline</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" type="text" placeholder="Jane Doe" autoComplete="name" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="org">Organization</Label>
              <Input id="org" type="text" placeholder="Harvard T.H. Chan School of Public Health" autoComplete="organization" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input id="signup-email" type="email" placeholder="you@organization.org" autoComplete="email" />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input id="signup-password" type="password" placeholder="••••••••" autoComplete="new-password" />
            </div>
            <Button type="submit" className="mt-1 w-full">
              Create account
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onNavigateToLogin}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Log in
            </button>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
