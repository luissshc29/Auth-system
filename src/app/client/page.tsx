"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { LuLogOut } from "react-icons/lu";

export default function Client() {
    const session = useSession();

    if (session.status === "loading") {
        return <h1 className="p-8 text-2xl font-extrabold">Please wait ...</h1>;
    }

    return (
        <div className="p-8 text-center">
            <div className="flex w-full justify-end">
                {session.data && (
                    <Link
                        href="/api/auth/signout"
                        className="rounded-[50%] p-2 bg-red-600 text-white scale-110 hover:scale-125 duration-300"
                    >
                        <LuLogOut />
                    </Link>
                )}
            </div>
            <div className="flex flex-col place-items-center rounded-2xl px-8 py-12 w-full mx-auto items-center shadow-xl shadow-neutral-300">
                <div className="flex flex-col-reverse md:flex-row items-center gap-4">
                    <h1 className="text-xl md:text-2xl font-extrabold mb-4">
                        Welcome, {session.data?.user?.name}!
                    </h1>
                    <img
                        src={
                            session.data?.user?.image ||
                            "https://media.istockphoto.com/id/1337144146/pt/vetorial/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=_XeYoSJQIN7GrE08cUQDJCo3U7yvoEp5OKpbhQzpmC0="
                        }
                        alt="Avatar"
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full mb-4"
                    />
                </div>

                <div>
                    <img
                        src="https://cdn.dribbble.com/users/2185205/screenshots/7886140/media/90211520c82920dcaf6aea7604aeb029.gif"
                        alt="Successfully authenticated gif"
                    />
                    <h2 className="text-lg md:text-xl font-medium text-green-600">
                        You were successfully{" "}
                        <span className="font-extrabold">authenticated</span>!
                    </h2>
                </div>
            </div>
        </div>
    );
}
