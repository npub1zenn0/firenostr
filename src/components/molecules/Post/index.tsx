"use client";
import Avatar from "@/components/atoms/Avatar";
import UserDetails from "@/components/atoms/UserDetails";
import { FC, ReactNode, useMemo } from "react";
import { UserProfile, getProfile } from "@/data/nostr/profiles";
import { useObservableState } from "observable-hooks";

type Poster = {
  identifier: string;
  sources: string[];
};
const backupAvatar = "/backup_logo.png";

const Post: FC<{ children?: ReactNode | null; poster: Poster }> = ({
  children,
  poster,
}) => {
  const profile$ = useMemo(
    () => getProfile(poster.identifier),
    [poster.identifier]
  );
  const profile = useObservableState(profile$, {} as UserProfile);
  const identifier = profile.identifier || poster.identifier;
  const displayName = profile.displayName || poster.identifier;
  const avatarSrc = profile.avatarSrc || backupAvatar;
  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col-reverse justify-end content-end items-end self-start mr-3 text-right sm:space-x-2 sm:flex-row sm:mr-5">
        <UserDetails
          identifier={identifier}
          name={displayName}
          sources={poster.sources}
        />
        <Avatar dimensions={100} src={avatarSrc} />
      </div>
      <p className="overflow-y-auto col-span-2 whitespace-pre-line break-words prose text-ellipsis overflow-x-clip">
        {children}
      </p>
    </div>
  );
};

export default Post;
