'use client'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/atoms/Logo/Logo";
import { useRegister } from "@/hooks/useRegister";
import { ErrorMessage } from "../../../atoms/Error/ErrorMessage";
import { Toaster } from "@/components/ui/toaster";

export function LoginForm() {
  const { errors, formValues, handleChange, handleSubmit } = useRegister();

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <Logo logoText={false} />
          <CardTitle className="text-xl">Cadastre-se na EcoSense</CardTitle>
          <CardDescription>
            Insira suas informações para cadastrar-se
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <ErrorMessage 
                showError={errors.generalistError !== ""} 
                message={errors.generalistError} 
              />
              <Label htmlFor="firstName">Nome completo</Label>
              <ErrorMessage 
                showError={errors.username !== ""} 
                message={errors.username} 
              />
              <Input
                id="username"
                placeholder="John Doe"
                value={formValues.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email}</span>
              )}
              <Input
                id="email"
                type="email"
                placeholder="example@example.com"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <ErrorMessage 
                showError={errors.password !== ""} 
                message={errors.password} 
              />
              <Input
                id="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Criar Conta
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Já possui uma conta?{" "}
            <Link href="/auth/login" className="underline">
              Faça login
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
}