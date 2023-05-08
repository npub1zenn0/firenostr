import { nip19 } from "nostr-tools";
import { FC } from "react";

export type User = {
  name: string;
  sources: string[];
  identifier: string;
};

const UserDetails: FC<User> = ({ name, identifier, sources }) => (
  <div className="flex flex-col max-w-full text-base-content overflow-clip truncate">
    <p className="mb-1 text-sm truncate">{name}</p>
    <p className="text-xs opacity-80 truncate">
      {nip19.npubEncode(identifier)}
    </p>
    <p className="text-xs opacity-80 truncate">{sources[0] || ""}</p>
  </div>
);

export default UserDetails;
