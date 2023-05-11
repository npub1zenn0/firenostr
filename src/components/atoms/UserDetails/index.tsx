import { nip19 } from "nostr-tools";
import { FC } from "react";

export type User = {
  name: string;
  sources: string[];
  identifier: string;
};

const UserDetails: FC<User> = ({ name, identifier, sources }) => {
  const npub = nip19.npubEncode(identifier);
  return (
    <div className="flex flex-col max-w-full text-base-content overflow-clip truncate">
      <p className="mb-1 text-sm truncate">{name}</p>
      <p className="text-xs opacity-80 truncate">
        {/* Would do nprofile, but iris doesn't support it. */}
        <a target="_blank" href={"nostr:" + npub}>
          {npub}
        </a>
      </p>
      <p className="text-xs opacity-80 truncate">{sources[0] || ""}</p>
    </div>
  );
};

export default UserDetails;
