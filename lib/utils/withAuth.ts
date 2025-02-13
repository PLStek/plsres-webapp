import { AccessLevel } from "@lib/models/auth";
import { checkAuthService, checkActionneurService } from "../services/auth";
import { sendLogMessage } from "@lib/services/discord/webhook";
import { ErrorMessages } from "./errorMessages";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WithAuthReturn<Fn extends (...args: any[]) => Promise<any>> = (
    ...args: Parameters<Fn>
) => Promise<{
    data: Awaited<ReturnType<Fn>> | null;
    error: string | null;
}>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withAuth<Fn extends (...args: any[]) => Promise<any>>(
    accessLevel: AccessLevel,
    fn: Fn
): WithAuthReturn<Fn> {
    return (async (
        ...args: Parameters<Fn>
    ): Promise<{
        data: ReturnType<Fn> | null;
        error: string | null;
    }> => {
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
            const data = await fn(...args);
            return { data, error: null };
        } catch (error) {
            if (
                error instanceof Error &&
                Object.values(ErrorMessages).map(String).includes(error.message)
            ) {
                return { data: null, error: error.message };
            }
            return { data: null, error: ErrorMessages.UnknownError };
        }
    }) as WithAuthReturn<Fn>;
}
