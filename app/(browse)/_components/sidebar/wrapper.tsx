"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";

interface WrapperProps {
  children: React.ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  const { collapsed } = useSidebar((state) => state);
  return (
    <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2d2e35] z-50", collapsed && "w-[70px]")}>
      {children}
    </aside>
  );
}
