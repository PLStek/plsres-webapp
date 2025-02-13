import { UserTokenPayload } from "@lib/models/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
import { removeTokenCookie } from "./cookies";
import { ErrorMessages } from "./errorMessages";

const SECRET_KEY = process.env.TOKEN_SECRET;

export const createUserToken = ({
    isAdmin,
    discordId,
    actionneurId,
}: {
    isAdmin: boolean;
    discordId: string;
    actionneurId?: number;
}): string => {
    const token = jwt.sign({ actionneurId, isAdmin, discordId }, SECRET_KEY, {
        expiresIn: "30d",
    });

    return token;
};

export const createActionneurToken = (actionneurId: number): string => {
    const token = jwt.sign({ actionneurId }, SECRET_KEY, { expiresIn: "1d" });

    return token;
};

export const decodeToken = (token: string): UserTokenPayload => {
    try {
        const { actionneurId, isAdmin, discordId, exp } = jwt.verify(
            token,
            SECRET_KEY
        ) as JwtPayload;
        if (!exp) {
            throw new Error(ErrorMessages.InvalidToken);
        }
        return { actionneurId, isAdmin, discordId, exp };
    } catch {
        removeTokenCookie("user_token");
        throw new Error(ErrorMessages.InvalidToken);
    }
};

export const decodeActionneurToken = (token: string) => {
    try {
        const { exp, actionneurId } = jwt.verify(
            token,
            SECRET_KEY
        ) as JwtPayload;
        if (!exp || !actionneurId) {
            throw new Error(ErrorMessages.InvalidToken);
        }
        return { exp, actionneurId };
    } catch {
        removeTokenCookie("actionneur_token");
        throw new Error(ErrorMessages.InvalidToken);
    }
};
