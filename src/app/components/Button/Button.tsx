import React from "react";

export default function Button({
    children,
    className,
    ...rest
}: {
    children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={`rounded-xl p-2 shadow-lg shadow-neutral-400 flex items-center justify-center ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}
