import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: "1111111111" },
    update: {},
    create: {
      number: "1111111111",
      name: "Alice",
      password: await bcrypt.hash("alicepassword", 10),
      balance: {
        create: {
          amount: 2000,
          locked: 0
        }
      },
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          provider: "HDFC Bank",
          token: "token__1"
        }
      }
    }
  });

  const bob = await prisma.user.upsert({
    where: { number: "2222222222" },
    update: {},
    create: {
      number: "2222222222",
      name: "Bob",
      password: await bcrypt.hash("bob", 10),
      balance: {
        create: {
          amount: 2000,
          locked: 0
        }
      },
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          provider: "HDFC Bank",
          token: "token__2"
        }
      }
    }
  });

  console.log({ alice, bob });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
