// app/register/page.tsx
import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="max-w-md w-full">
      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold">Cadastro</h1>
          <p className="text-gray-500">Crie sua conta para começar</p>
        </div>

        <RegisterForm />

        <div className="text-center text-sm">
            Já tem conta? <Link href="/login" className="text-blue-500">Entrar</Link>
        </div>

      </div>
    </main>
  );
}