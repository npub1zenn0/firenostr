import { filter, map, of, tap } from "rxjs";
import { getEvent } from "./connections";
import { Event } from "nostr-tools";

export type UserProfile = {
  name: string;
  displayName: string;
  identifier: string;
  avatarSrc?: string;
};

const parseProfile = (e: Event) => {
  try {
    const p = JSON.parse(e.content);
    const up: UserProfile = {
      name: (p.name as string) || "",
      displayName: (p.display_name as string) || "",
      identifier: e.pubkey,
      avatarSrc: p.picture,
    };
    return up;
  } catch {
    console.warn("Profile parsing failed for", e);
    return;
  }
};

const cache: Record<string, UserProfile> = {};

export const getProfile = (userId: string) => {
  if (cache[userId]) {
    return of(cache[userId]);
  }
  return getEvent({
    kinds: [0],
    authors: [userId],
  }).pipe(
    map(parseProfile),
    filter(Boolean),
    tap((e) => {
      cache[e.identifier] = e;
    })
  );
};
