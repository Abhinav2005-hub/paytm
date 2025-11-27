import express from "express";
import db from "@repo/db";

const app = express();

app.post("/hdfcWebhook", async (req,res) => {
    //TODO: Add zod validation here?
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userIdentifier,
        amount: req.body.amount
    };

    try {
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
                    }
                }
            }),
            await db.onRampTransacition.updateMany({
                where: {
                    token: paymentInformation.token,
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.json({
            message: "captured"
        })
    } catch (e){
        console.error(e);
        res.status(411).json({
            message:  "Error while processing webhook"
        })
    }
})