"use client";

import { InputData } from "@/utils/types/InputData";
import { BuiltInProviderType } from "next-auth/providers/index";
import { LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import Button from "../Button/Button";

export default function SigninForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputData>();

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        try {
            setLoading(true);
            const res = await signIn("credentials", {
                username: data.username,
                password: data.password,
                redirect: false,
            });
            console.log(res);
            if (res?.ok) {
                router.push("/client");
            } else {
                throw new Error();
            }
        } catch (error) {
            setError("Wrong username and/or password!");
            setLoading(false);
        }
        setTimeout(() => {
            setError("");
        }, 8000);
        setLoading(false);
        reset();
    };

    function logIn(provider: LiteralUnion<BuiltInProviderType>) {
        setLoading(true);
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
            {errors && (
                <p className="text-sm text-red-500">
                    {errors.username?.message}
                </p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
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
                    type="button"
                >
                    <FaGithub size={24} />
                    Login with GitHub
                </button>
                <button
                    className="px-3 py-3 border flex items-center gap-3 dark:border-slate-700 rounded-2xl border-slate-400 text-slate-900 hover:shadow transition duration-150"
                    onClick={() => logIn("google")}
                    type="button"
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
            <Button
                disabled={loading}
                type="submit"
                className="bg-blue-600 text-white w-2/3 md:w-1/2 "
            >
                {loading ? (
                    <>
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                        Loading ...
                    </>
                ) : (
                    <p>Login</p>
                )}
            </Button>
        </form>
    );
}
