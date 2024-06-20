"use client";

import { useParticipants } from "@livekit/components-react";
import { LocalParticipant, RemoteParticipant } from "livekit-client";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";

interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export function ChatCommunity({
    hostName,
    isHidden,
    viewerName,
}: ChatCommunityProps) {
    const [value, setValue] = useState("");
    const debouncedValue = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const onChange = (newValue: string) => {
        setValue(newValue);
    };

    const filteredParticipants = useMemo(() => {
        const deduped = participants.reduce((acc, participant) => {
            const hostAsViewer = `host-${participant.identity}`;
            if (!acc.some((p) => p.identity === hostAsViewer)) {
                acc.push(participant);
            }
            return acc;
        }, [] as (RemoteParticipant | LocalParticipant)[]);

        return deduped.filter((p) => {
            return p.name
                ?.toLocaleLowerCase()
                .includes(debouncedValue[0].toLowerCase());
        });
    }, [participants, debouncedValue]);

    if (isHidden) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is disabled
                </p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <Input
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search community"
                className="border-white/10"
            />
            <ScrollArea className="gap-y-2 mt-4">
                <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                    No result
                </p>
                {filteredParticipants.map((p) => (
                    <CommunityItem
                        key={p.identity}
                        hostName={hostName}
                        viewerName={viewerName}
                        participantName={p.name}
                        participantIdentity={p.identity}
                    />
                ))}
            </ScrollArea>
        </div>
    );
}
