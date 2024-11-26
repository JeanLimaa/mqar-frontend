import { LoginForm } from "@/components/templates/auth/signup/RegisterForm";

export default function LoginPage() {
    return(
        <main className="min-h-screen bg-white flex flex-col p-14 flex-1 items-center justify-center max-md:p-8 max-sm:px-[0.1rem]">
            <LoginForm />
        </main>
    )
}