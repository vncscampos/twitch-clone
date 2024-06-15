import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Container } from "./_components/container";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface CreateLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function CreatorLayout({
  params,
  children,
}: CreateLayoutProps) {
  const self = await getSelfByUsername(params.username);

  if (!self) redirect("/");

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Sidebar />
        <Container>{children}</Container>
      </div>
      ;
    </>
  );
}
