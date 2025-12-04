"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db";

export async function createOnRampTransaction(amount: number, provider: string) {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if(!userId) {
        return {
            message: "User not logged in"
        }
    }

    // Generate token (REQUIRED by Prisma model)
    const token = Math.random().toString();

    await prisma.onRampTransaction.create({
        data: {
            userId: Number(userId),
            amount: amount,
            provider,
            token: token,
            status: "Processing",
            startTime: new Date()
        }
    })

    return {
        message: "On ramp transaction added"
    }
}