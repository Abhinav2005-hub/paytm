import prisma from "@repo/db";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";

async function getBalance(userId: number) {
  const balance = await prisma.balance.findFirst({
    where: { userId },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions(userId: number) {
  const txns = await prisma.onRampTransaction.findMany({
    where: { userId },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function Page() {
  // Fetch session ONCE (correct way)
  const session = await getServerSession(authOptions);

  // Protect route correctly
  if (!session?.user?.id) {
    redirect("/"); // go back to home/login
  }

  // Get valid userId
  const userId = Number(session.user.id);

  // Fetch data from DB
  const balance = await getBalance(userId);
  const transactions = await getOnRampTransactions(userId);

  // Render UI
  return (
    <div className="w-full px-8">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        {/* Left Side: Add Money */}
        <div>
          <AddMoney />
        </div>

        {/* Right Side: Balance + Transactions */}
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
