"use client";

import { InputData } from "@/utils/types/InputData";
import { signIn } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

export default function SignupForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<InputData>();

    const onSubmit: SubmitHandler<InputData> = async (data) => {
        try {
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
            alert("User already exists!");
        }
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-evenly p-8 gap-4 lg:gap-0 rounded-2xl 
            bg-neutral-200 w-full mx-auto items-center
            shadow-lg shadow-neutral-400"
        >
            <h2 className="text-xl font-medium">
                <span className="font-extrabold">Sign up</span> if you're new
                here ...
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
            <button
                type="submit"
                className="rounded-xl p-2 w-1/2 bg-blue-600 text-white shadow-lg shadow-neutral-400"
            >
                Sign Up
            </button>
        </form>
    );
}
