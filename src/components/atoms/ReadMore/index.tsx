import clsx from "clsx";
import { FC, useState } from "react";

const ReadMore: FC<{
  className?: string;
  content: string;
  maxLength: number;
}> = ({ content, maxLength, className }) => {
  const [showing, setShowing] = useState(false);
  const shouldCut = content.length > maxLength + 50;
  return (
    <>
      <span className="">
        {showing || !shouldCut
          ? content.trim()
          : content.slice(0, maxLength).trim()}
      </span>
      {!showing && shouldCut && (
        <button
          className={clsx(className, "block")}
          onClick={() => setShowing(true)}
        >
          More...
        </button>
      )}
    </>
  );
};

export default ReadMore;
