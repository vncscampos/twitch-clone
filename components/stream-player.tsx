"use client";

import { useViewerToken } from "@/hooks/use-viewer-token";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
  user: User & { stream: Stream | null };
  stream: Stream;
  isFollowing: boolean;
}

export async function StreamPlayer({ user, stream }: StreamPlayerProps) {
  const { token, name, identity } = await useViewerToken(user.id);

  if(!token || !name || !identity) {
    return(
        <div>
            Cannot watch the stream
        </div>
    )
  }

  return <div></div>;
}
