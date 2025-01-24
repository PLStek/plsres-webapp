import { AccessLevel } from "@lib/models/auth";
import { checkAuthService, checkActionneurService } from "../services/auth";
import { sendLogMessage } from "@lib/services/discord/webhook";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAuth<Fn extends (...args: any[]) => Promise<any>>(
    accessLevel: AccessLevel,
    fn: Fn
): Fn {
    return (async (...args: Parameters<Fn>): Promise<ReturnType<Fn>> => {
        try {
            if (accessLevel !== "guest") {
                if (accessLevel === "verified") {
                    await checkAuthService();
                } else {
                    const { discordId } = await checkActionneurService(
                        accessLevel === "admin"
                    );
                    await sendLogMessage(fn.title, discordId);
                }
            }
        } catch (error) {
            console.error("Authentication Error:", error);
            throw new Error("Authentication Error");
        }
        return await fn(...args);
    }) as Fn;
}
