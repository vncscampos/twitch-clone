"use client";

import {
    useChat,
    useConnectionState,
    useRemoteParticipant,
} from "@livekit/components-react";
import { ConnectionState } from "livekit-client";
import { useMediaQuery } from "usehooks-ts";

import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar";
import { useEffect, useMemo, useState } from "react";
import { ChatForm, ChatFormSkeleton } from "./chat-form";
import { ChatHeader, ChatHeaderSkeleton } from "./chat-header";
import { ChatList, ChatListSkeleton } from "./chat-list";

interface ChatProps {
    hostName: string;
    hostIdentity: string;
    viewerName: string;
    isFollowing: boolean;
    isChatEnabled: boolean;
    isChatDelayed: boolean;
    isChatFollowersOnly: boolean;
}

export function Chat({
    viewerName,
    hostName,
    hostIdentity,
    isChatDelayed,
    isChatEnabled,
    isChatFollowersOnly,
    isFollowing,
}: ChatProps) {
    const matches = useMediaQuery("(max-width: 1024px)");
    const { variant, onExpand } = useChatSidebar((state) => state);

    const connectionState = useConnectionState();
    const participant = useRemoteParticipant(hostIdentity);

    const isOnline =
        participant && connectionState === ConnectionState.Connected;

    const isHidden = !isChatEnabled || !isOnline;

    const [value, setValue] = useState("");
    const { chatMessages: messages, send } = useChat();

    useEffect(() => {
        if (matches) onExpand();
    }, [matches, onExpand]);

    const reversedMessages = useMemo(() => {
        return messages.sort((a, b) => b.timestamp - a.timestamp);
    }, [messages]);

    const onSubmit = () => {
        if (!send) return;

        send(value);
        setValue("");
    };

    const onChange = (value: string) => {
        setValue(value);
    };

    return (
        <div className="flex flex-col bg-background border-l border-b pt-0 h-[calc(100vh)]">
            <ChatHeader />
            {variant === ChatVariant.CHAT && (
                <>
                    <ChatList messages={reversedMessages} isHidden={isHidden} />
                    <ChatForm
                        onSubmit={onSubmit}
                        value={value}
                        onChange={onChange}
                        isHidden={isHidden}
                        isChatFollowersOnly={isChatFollowersOnly}
                        isChatDelayed={isChatDelayed}
                        isFollowing={isFollowing}
                    />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                    <p>Community</p>
                </>
            )}
        </div>
    );
}

export const ChatSkeleton = () => {
    return (
        <div className="flex flex-col border-l border-b pt-0 h-[calc(100vh-80px)] border-2">
            <ChatHeaderSkeleton />
            <ChatListSkeleton />
            <ChatFormSkeleton />
        </div>
    );
};
