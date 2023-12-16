"use client";

import { InputData } from "@/utils/types/InputData";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGithub } from "react-icons/fa";

export default function SigninForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputData>();

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        try {
            signIn("credentials", {
                username: data.username,
                password: data.password,
                callbackUrl: "/client",
            });
        } catch (error) {
            alert("User already exists!");
        }
        reset();
    };

    function logIn(provider: LiteralUnion<BuiltInProviderType>) {
        signIn(provider, {
            callbackUrl: "/client",
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col p-8 gap-4 rounded-2xl 
            bg-neutral-200 w-full mx-auto items-center
            shadow-lg shadow-neutral-400"
        >
            <h2 className="text-xl font-medium">
                ... or <span className="font-extrabold">login</span> if you're a
                client.
            </h2>
            <p className="text-sm text-red-500">{errors.username?.message}</p>
            <input
                type="text"
                placeholder="Username"
                {...register("username", {
                    required: true,
                    pattern: {
                        value: /^\S+$/,
                        message: "Your username can't contain whitespaces",
                    },
                })}
                className="p-2 rounded-xl w-4/5"
            />
            <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="p-2 rounded-xl w-4/5"
            />
            <div className="flex flex-col gap-2 py-2">
                <button
                    className="flex items-center gap-3 cursor-pointer text-white bg-gradient-to-r from-gray-800 to-black px-3 py-3 rounded-2xl border border-gray-600 text-sm"
                    onClick={() => logIn("github")}
                >
                    <FaGithub size={24} />
                    Login with GitHub
                </button>
                <button
                    className="px-3 py-3 border flex items-center gap-3 dark:border-slate-700 rounded-2xl border-slate-400 text-slate-900 dark:text-slate-300 hover:shadow transition duration-150"
                    onClick={() => logIn("google")}
                >
                    <img
                        className="w-6 h-6"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        loading="lazy"
                        alt="google logo"
                    />
                    Login with Google
                </button>
            </div>
            <button
                type="submit"
                className="rounded-xl p-2 w-1/2 bg-blue-600 text-white shadow-lg shadow-neutral-400"
            >
                Login
            </button>
        </form>
    );
}
