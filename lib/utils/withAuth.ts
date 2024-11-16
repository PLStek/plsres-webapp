import { AccessLevel } from "@lib/models/auth";
import { checkAuthService, checkActionneurService } from "../services/auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAuth<Fn extends (...args: any[]) => Promise<any>>(
    accessLevel: AccessLevel,
    fn: Fn
): Fn {
    return (async (
        ...args: Parameters<Fn>
    ): Promise<ReturnType<Fn> | { error: string }> => {
        try {
            if (accessLevel !== "guest") {
                if (accessLevel === "verified") {
                    await checkAuthService();
                } else {
                    await checkActionneurService(accessLevel === "admin");
                }
            }
            return await fn(...args);
        } catch (error) {
            console.error("Authentication Error:", error);
            return {
                error:
                    error instanceof Error ? error.message : "Erreur inconnue",
            };
        }
    }) as Fn;
}
