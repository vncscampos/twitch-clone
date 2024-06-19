"use server";

import { getSelf } from "@/lib/auth-service";
import { isBlockedByUser } from "@/lib/block-service";
import { getUserById } from "@/lib/user-service";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

export async function createViewerToken(hostIdentity: string) {
  let self;

  try {
    self = await getSelf();
  } catch (error) {
    const id = v4();
    const username = `guest#${Math.floor(Math.random() * 10000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);
  if (!host) throw new Error("User not found");

  const isBlocked = await isBlockedByUser(host.id);
  if (isBlocked) throw new Error("User is blocked");

  const isHost = self.id === host.id;

  //cria token pro viewer
  const token = await new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    {
      identity: isHost ? `host-${self.id}` : self.id,
      name: self.username,
    }
  );

  //permissões para o viewer
  token.addGrant({
    room: host.id,
    roomJoin: true,
    canPublish: false,
    canPublishData: true,
  });

  //retorna o token jwt p conectar com livekit server
  return await Promise.resolve(token.toJwt());
}
