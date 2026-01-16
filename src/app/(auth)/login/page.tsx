import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <form className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="border border-gray-300 rounded-md p-2"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="border border-gray-300 rounded-md p-2"
        />
        <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
          Login
        </button>
        <p className="text-sm text-center">
          Ainda não possui uma conta?{` `}
          <Link href="/register" className="text-blue-500">
            Cadastre-se
          </Link>
        </p>
      </form>
    </main>
  );
}
