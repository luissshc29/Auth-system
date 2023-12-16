"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Client() {
    const session = useSession();

    if (session.status === "loading") {
        return <h1 className="p-8 text-xl font-bold">Please wait ...</h1>;
    }

    return (
        <div className="p-8">
            <div className="flex w-full justify-between">
                <h1 className="text-2xl font-extrabold mb-4">
                    Welcome, {session.data?.user?.name}!
                </h1>
                {session.data && (
                    <Link
                        href="/api/auth/signout"
                        className="underline font-bold text-red-600 text-lg"
                    >
                        Logout
                    </Link>
                )}
            </div>
            {session.data?.user?.image && (
                <img
                    src={session.data?.user?.image as string}
                    alt="Avatar"
                    className="w-28 h-28 rounded-full mb-4"
                />
            )}
        </div>
    );
}
