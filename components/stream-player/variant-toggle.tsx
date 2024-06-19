"use client";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import {
    MessageSquare,
    Users
} from "lucide-react";
import { Hint } from "../hint";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

export function VariantToggle() {
    const { variant, onChangeVariant } = useChatSidebar((state) => state);

    const isChat = variant === ChatVariant.CHAT;

    const Icon = isChat ? Users : MessageSquare;

    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.CHAT;
        onChangeVariant(newVariant);
    };

    const label = isChat ? "Community" : "Go back to chat";

    return (
        <Hint label={label} side="left" asChild>
            <Button
                onClick={onToggle}
                variant="ghost"
                className="h-auto p-2 hover:bg-white/10 hover:text-primary"
            >
                <Icon className="h-4 w-4" />
            </Button>
        </Hint>
    );
}

export function VariantToggleSkeleton() {
    return (
        <div className="relative p-3 border-b hidden md:block">
            <Skeleton className="absolute h-6 w-6 left-3 top-3" />
            <Skeleton className="w-28 h-6 mx-auto" />
        </div>
    );
}
