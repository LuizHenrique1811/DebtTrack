import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="max-w-md w-full">
      <div className="w-full max-w-md space-y-6">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-gray-500">Faça login para continuar</p>
        </div>

        <LoginForm />

        <div className="text-center text-sm">
            Ainda não possui uma conta? <Link href="/register" className="text-blue-500">Cadastre-se</Link>
        </div>

      </div>
    </main>
  );
}
