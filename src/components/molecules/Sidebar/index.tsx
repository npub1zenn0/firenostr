import { FC } from "react";
import Sources from "./Sources";
import SidebarFooter from "./SidebarFooter";
import Link from "next/link";
import ExternalLinkIcon from "@heroicons/react/20/solid/ArrowTopRightOnSquareIcon";
import clsx from "clsx";

const Sidebar: FC<{ className?: string }> = ({ className }) => (
  <div
    className={clsx("flex flex-col justify-between w-full h-full", className)}
  >
    <div className="flex w-full flex-col">
      <div className="p-3 pl-4 prose">
        <h2 className="heading-2">
          <Link href="/" className="no-underline cursor-pointer">
            FireNostr 🔥
          </Link>
        </h2>
        <p className="text-sm">A stream of events from nostr.</p>
        <p className="text-sm">
          Connect to different servers by toggling the buttons below.
        </p>
        <p className="text-sm">
          Nostr is a protocol for hosting decentralized apps. Find out more at{" "}
          <a
            className="inline-block whitespace-nowrap"
            rel="external noopener noreferrer"
            href="https://nostr.how"
            target="_blank"
          >
            nostr.how{" "}
            <ExternalLinkIcon className="h-4 w-4 inline" aria-hidden="true" />
          </a>
          .
        </p>
      </div>
      <Sources />
    </div>
    <div className="flex px-3 py-6 pb-10 w-full">
      <SidebarFooter />
    </div>
  </div>
);

export default Sidebar;
