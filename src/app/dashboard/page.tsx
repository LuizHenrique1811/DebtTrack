import { getCurrentUser } from "@/core/auth/current-user.service";

export default async function DashboardPage() {
    const user = await getCurrentUser();

    return (
        <h2>Bem-vindo {user?.name}</h2>
    );
}       