"use client";

import { useMediaQuery } from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/use-sidebar";
import { useEffect } from "react";

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const matches = useMediaQuery("(max-width: 1024px)");
  const { collapsed, onCollapse, onExpand } = useSidebar((state) => state);

  useEffect(() => {
    if (matches) onCollapse();
    else onExpand();
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
}
