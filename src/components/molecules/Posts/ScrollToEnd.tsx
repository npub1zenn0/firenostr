import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { useUpdateEffect } from "@react-hookz/web";
import clsx from "clsx";
import { FC, useState } from "react";

const ScrollToEnd: FC<{
  scroll: () => void;
  postsCount: number;
}> = ({ scroll, postsCount }) => {
  const [morePosts, setMorePosts] = useState(false);
  useUpdateEffect(() => {
    setMorePosts(true);
  }, [postsCount]);
  return (
    <button className="fixed bottom-5 right-10 btn btn-sm" onClick={scroll}>
      <span
        className={clsx(
          "inline-block normal-case whitespace-nowrap transition-all duration-700 overflow-x-clip",
          {
            "max-w-0": !morePosts,
            "max-w-sm": morePosts,
            "pr-2": morePosts,
          }
        )}
      >
        {morePosts && <>New posts</>}
      </span>
      <ArrowDownCircleIcon className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only">Scroll to bottom</span>
    </button>
  );
};

export default ScrollToEnd;
