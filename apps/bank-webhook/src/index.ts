import express from "express";
import db from "@repo/db";

const app = express();
app.use(express.json());

app.post("/hdfcbewbhooook", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.userIdentifier,
    amount: req.body.amount,
  };

  try {
    await db.$transaction([
      db.balance.updateMany({
        where: { userId: Number(paymentInformation.userId) },
        data: {
          amount: { increment: Number(paymentInformation.amount) },
        },
      }),

      db.onRampTransaction.updateMany({
        where: { token: paymentInformation.token },
        data: {
          status: "Success",
        },
      }),
    ]);

    res.json({ message: "Captured" });
  } catch (err) {
    console.log(err);
    res.status(411).json({ message: "Error while processing webhook" });
  }
});

app.listen(3003);
