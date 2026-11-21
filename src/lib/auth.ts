import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma"; // your prisma client instance
import { headers } from "next/headers";
import { nextCookies } from "better-auth/next-js";
import { cache } from "react";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "sqlite", ...etc
    }),
    emailAndPassword: {
        enabled: true
    },
    plugins: [nextCookies()]
});

export const getCurrentUser = cache(async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    return session?.user;
});

export const requiredAuthUser = cache(async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session)throw new Error("Unauthorized");
    
    return session?.user;
});

