//import  {}

export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <main className="flex  justify-center h-screen columns-2">
            <section className="hidden flex-col items-center justify-center border-r border-gray-200 w-1/2 md:flex">
                <h1 className="text-2xl font-bold">DebtTrack</h1>
                <p className="text-sm text-gray-500">Track your debts and manage your finances</p>
            </section>
            <section className="flex w-full flex-col items-center justify-center md:w-1/2">
                {children}
            </section>
        </main>
    );
  }