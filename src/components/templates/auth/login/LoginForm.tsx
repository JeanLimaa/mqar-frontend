'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Logo from "@/components/atoms/Logo/Logo"
import { useLogin } from "@/hooks/useLogin"

export function LoginForm() {
  const { email, error, handleLogin, password, setEmail, setPassword} = useLogin();

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Logo logoText={false} />
        <CardTitle className="text-2xl">Faça login na EcoSense</CardTitle>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <CardDescription>
          Insira seu e-mail abaixo para realizar o login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Esqueceu sua senha?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <Button onClick={handleLogin} type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Não possui uma conta?{" "}
          <Link href="/auth/register" className="underline">
            Cadastre-se
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
