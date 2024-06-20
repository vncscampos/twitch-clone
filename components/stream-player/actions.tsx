"use client";

import { onFollow, onUnfollow } from "@/actions/follow";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export function Actions({ hostIdentity, isFollowing, isHost }: ActionsProps) {
    const [isPending, startTransition] = useTransition();
    const { userId } = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) =>
                    toast.success(
                        `You are now following ${data.following.username}`
                    )
                )
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) =>
                    toast.success(`You unfollow ${data.following.username}`)
                )
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const toggleFollow = () => {
        if (!userId) return router.push("/sign-in");

        if (isHost) return;
        if (isFollowing) {
            handleUnFollow();
        } else {
            handleFollow();
        }
    };

    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart
                className={cn(
                    "h-4 w-4 mr-2",
                    isFollowing ? "fill-white" : "fill-none"
                )}
            />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    );
}

export function ActionsSkeleton() {
    return(
        <Skeleton className="h-10 w-full lg:w-24" />
    )
}
