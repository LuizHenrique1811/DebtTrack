import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <h2>Bem-vindo {session?.user?.name}</h2>
    ); 
}       