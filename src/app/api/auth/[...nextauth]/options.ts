import { db } from "@/app/lib/db";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    type: "text",
                    placeholder: "Username",
                    label: "Username:",
                },
                password: {
                    type: "password",
                    placeholder: "Password",
                    label: "Password:",
                },
            },
            async authorize(credentials) {
                const user = await db.user.findUnique({
                    where: {
                        username: credentials?.username,
                        password: credentials?.password,
                    },
                });
                if (user) {
                    return {
                        id: user.id.toString(),
                        name: user.username,
                        password: user.password,
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};
