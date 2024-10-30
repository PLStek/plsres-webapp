import { CookieType } from "@lib/models/auth";
import { cookies } from "next/headers";

export const getCookie = (type: CookieType) => cookies().get(type)?.value;

export const setCookie = (type: CookieType, token: string) =>
    cookies().set({
        name: type,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: type === "user_token" ? 3600 * 24 * 30 : 3600 * 12,
    });

export const removeTokenCookie = (type: CookieType) => cookies().delete(type);
