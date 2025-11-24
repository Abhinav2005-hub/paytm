export default async function Page() {
  const users = await fetch("http://localhost:3000/api/users").then(res => res.json());

  return (
    <div>
      {users.map(u => (
        <p key={u.id}>{u.name}</p>
      ))}
    </div>
  );
}
