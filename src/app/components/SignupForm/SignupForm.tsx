"use client";

import { InputData } from "@/utils/types/InputData";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../Button/Button";

export default function SignupForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputData>();

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        try {
            setLoading(true);
            const res = await fetch("/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                signIn("credentials", {
                    username: data.username,
                    password: data.password,
                    callbackUrl: "/client",
                });
            } else {
                throw new Error();
            }
        } catch (error) {
            setError("User already exists!");
        }
        setTimeout(() => {
            setError("");
        }, 8000);
        setLoading(false);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center p-8 gap-4 rounded-2xl 
            bg-neutral-200 w-full mx-auto items-center
            shadow-lg shadow-neutral-400"
        >
            <h2 className="text-xl font-medium">
                <span className="font-extrabold">Sign up</span> if you're new
                here ...
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
                    <p>Sign up</p>
                )}
            </Button>
        </form>
    );
}
