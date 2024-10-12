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

export const description =
  "A sign up form with first name, last name, email and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account"

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Logo logoText={false} />
        <CardTitle className="text-xl">Cadastre-se na EcoSense</CardTitle>
        <CardDescription>
          Insira suas informações para cadastrar-se
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            {/* <div className="grid gap-2"> */}
              <Label htmlFor="first-name">Nome completo</Label>
              <Input id="first-name" placeholder="John Doe" required />
            {/* </div> */}
{/*             <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required />
            </div> */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            Criar Conta
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Já possui uma conta?{" "}
          <Link href="/auth/login" className="underline">
            Faça login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
