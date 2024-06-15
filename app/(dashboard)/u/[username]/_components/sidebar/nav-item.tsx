"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useCreatorSidebar } from "@/store/user-creator-sidebar";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface NavItemProps {
  key: string;
  label: string;
  icon: LucideIcon;
  href: string;
  isActive: boolean;
}

export function NavItem({
  href,
  icon: Icon,
  isActive,
  key,
  label,
}: NavItemProps) {
  const { collapsed } = useCreatorSidebar((state) => state);

  return (
    <Button
      className={cn(
        "w-full h-12",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent"
      )}
      variant="ghost"
      asChild
    >
      <Link href={href}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-4 w-4", collapsed ? "mr-0" : "mr-2")} />
          {!collapsed && <span>{label}</span>}
        </div>
      </Link>
    </Button>
  );
}

export function NavItemSkeleton() {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="flex-1 hidden lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
}
