"use client";

import { Printer } from "lucide-react";
import { useEffect } from "react";

// Abre a janela de impressão, onde dá para escolher "Salvar como PDF".
export function PrintOnLoad() {
    useEffect(() => {
        const timer = setTimeout(() => window.print(), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-700 print:hidden"
        >
            <Printer className="h-4 w-4" />
            Imprimir ou salvar PDF
        </button>
    );
}
