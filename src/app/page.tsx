import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">DebtTrack</h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="rounded border px-4 py-2"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
