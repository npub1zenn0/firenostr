"use client";

import Post from "@/components/molecules/Post";
import { FC, useEffect } from "react";
import { useChatScroll } from "./useChatScroll";
import { useObservableState } from "observable-hooks";
import { initializeRelays } from "@/data/nostr/connections";
import ScrollToEnd from "./ScrollToEnd";
import { selectedEvents$ } from "@/data/nostr/events";

const Posts: FC<{}> = ({}) => {
  const posts = useObservableState(selectedEvents$, []);
  const { scrollToBottom, isScrolledToBottom, anchorProps, itemProps, ref } =
    useChatScroll(posts.length);

  useEffect(() => {
    initializeRelays();
  }, []);

  return (
    <div className={"overflow-auto py-8 h-full"} ref={ref}>
      <div className="container px-4 py-4 mx-auto space-y-8 sm:space-y-6 sm:pl-10">
        {posts.slice(-500).map(({ event, sources }) => (
          <div
            key={event.id + event.pubkey + event.created_at}
            className={itemProps.className}
          >
            <Post
              poster={{
                identifier: event.pubkey,
                sources,
              }}
            >
              {event.content}
            </Post>
          </div>
        ))}
        <div {...anchorProps}></div>
      </div>
      {posts.length > 0 && !isScrolledToBottom && (
        <ScrollToEnd postsCount={posts.length} scroll={scrollToBottom} />
      )}
    </div>
  );
};

export default Posts;
