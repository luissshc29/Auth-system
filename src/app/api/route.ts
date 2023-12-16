import { NextRequest, NextResponse } from "next/server";
import { CreateUser } from "../lib/db";
import { InputData } from "@/utils/types/InputData";

async function handler(req: NextRequest, res: NextResponse) {
    try {
        const body: InputData = await req.json();
        await CreateUser(body);
        return NextResponse.json({ message: "User created successfully!" });
    } catch (error) {
        throw new Error("User already exists!");
    }
}

export { handler as POST };
