"use client";

import Link from "next/link";
import React from "react";
import { useSession } from "next-auth/react";

export default function Navbar() {
    const session = useSession();

    return (
        <div className="flex w-screen justify-evenly py-6 underline">
            <Link href="/client">Client</Link>
            {session.data ? (
                <Link href="/api/auth/signout">Logout</Link>
            ) : (
                <Link href="/client">Login</Link>
            )}
        </div>
    );
}
