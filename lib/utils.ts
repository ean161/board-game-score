import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function genColorBasedOnName(str: string) {
    const TAILWIND_COLORS = [
        "red",
        "orange",
        "yellow",
        "purple",
        "green",
        "white",
        "pink",
        "blue",
    ];

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return TAILWIND_COLORS[Math.abs(hash) % TAILWIND_COLORS.length];
}
