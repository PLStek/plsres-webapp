"use server";

import { CookieType } from "@lib/models/auth";
import { cookies } from "next/headers";

export const getCookie = async (type: CookieType) =>
    (await cookies()).get(type)?.value;

export const setCookie = async (type: CookieType, token: string) =>
    (await cookies()).set({
        name: type,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: type === "user_token" ? 3600 * 24 * 30 : 3600 * 12,
    });

export const removeTokenCookie = async (type: CookieType) =>
    (await cookies()).delete(type);
