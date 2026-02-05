import { listDebtorAction } from "@/actions/debtor/debtor.action";
import { DashboardDialog } from "@/components/dashboard/dashboard-dialog";
import { Button } from "@/components/ui/button";

export default async function DebtorsPage() {

    const { debtors, error } = await listDebtorAction();

    return (
        <main className="flex flex-col gap-4">
            <DashboardDialog className="max-w-2xl" />
            <div className="flex flex-col gap-4">
                {debtors?.map((debtor) => (
                    <div key={debtor.id}>
                        <h3>{debtor.name}</h3>
                        <p>{debtor.email}</p>
                        <p>{debtor.phone}</p>
                    </div>
                ))}
            </div>
        </main>
    );
}