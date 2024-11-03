import { LoginForm } from "@/components/templates/auth/login/LoginForm";

export default function LoginPage() {
    return(
        <main className="min-h-screen bg-white flex flex-col p-14 flex-1 items-center justify-center">
            <LoginForm />
        </main>
    )
}