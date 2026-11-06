import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
    style?: CSSProperties;
}

export function Skeleton({ className, style }: SkeletonProps) {
    return (
        <div
            aria-hidden
            style={style}
            className={cn(
                "animate-pulse rounded-md bg-zinc-200 motion-reduce:animate-none dark:bg-zinc-800",
                className,
            )}
        />
    );
}
