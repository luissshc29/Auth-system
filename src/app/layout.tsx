import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Authentication System",
    description: "Simple authentication web system using NextAuth",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <Navbar />
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
