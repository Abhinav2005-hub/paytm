import prisma from "@repo/db";

export default async function Page() {
  const users = await prisma.user.findMany();

  return (
    <div className="text-2xl">
      Hi there — Total users: {users.length}
    </div>
  );
}