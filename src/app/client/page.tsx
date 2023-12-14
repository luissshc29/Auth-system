"use client";

import { useSession } from "next-auth/react";

export default function Client() {
    const session = useSession();
    console.log(session);

    if (session.status === "loading") {
        return <h1 className="p-8 text-xl font-bold">Please wait ...</h1>;
    }

    return (
        <div className="p-8">
            {session.data?.user?.image && (
                <img
                    src={session.data?.user?.image as string}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full mb-4"
                />
            )}
            <h1 className="text-xl font-bold">
                Welcome, {session.data?.user?.name}!
            </h1>
        </div>
    );
}
