import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    isLoading?: boolean;
    loadingText?: string;
    variant?: "green" | "gray" | "red";
}

export function Button({ children, isLoading = false, loadingText = "Carregando...", variant = "green", className, disabled, ...props }: ButtonProps) {

    const variants = {
        green: "bg-green-600 hover:bg-green-700",
        gray: "bg-gray-600 hover:bg-gray-700",
        red: "bg-red-600 hover:bg-red-700 "
    }

    return (
        <button
            type="submit"
            disabled={isLoading}
            className={twMerge(
                "flex items-center justify-center gap-2 p-2 rounded transition-colors w-full text-white font-medium disabled:opacity-50",
                variants[variant],
                (isLoading || disabled) && "opacity-50 cursor-not-allowed",
                className
            )}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span className="animate-pulse">{loadingText}</span>
                </>
            ) : (
                children
            )}
        </button>
    );
}