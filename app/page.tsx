import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <p>Only authenticated users can se this</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
