import { InputData } from "@/utils/types/InputData";
import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient();

export async function CreateUser(user: InputData) {
    await db.user.create({
        data: {
            username: user.username,
            password: user.password,
        },
    });
}
