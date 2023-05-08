"use client";

import { addSource } from "@/data/nostr/sources";
import clsx from "clsx";
import { FC, ReactNode, useId, useState } from "react";

const prefix = (url: string) => "wss://" + url.replace(/^wss:\/\//, "");

const validates = (url: string) => {
  if (!url) {
    return false;
  }
  try {
    return new URL(prefix(url));
  } catch {
    return false;
  }
};

const SidebarFooter: FC<{ children?: ReactNode | null }> = ({}) => {
  const [text, setText] = useState("");
  const ok = validates(text);
  const id = useId();
  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        if (ok) {
          addSource(text);
          setText("");
        }
      }}
    >
      <div className="form-control">
        <label htmlFor={id} className="label">
          <span className="label-text">Add sources</span>
        </label>
        <input
          value={text}
          onInput={(e) => setText((e.currentTarget as any).value)}
          id={id}
          type="text"
          placeholder="wss://..."
          className="input input-md input-bordered w-full"
        />
      </div>
      <div className="form-control">
        <button
          type="submit"
          disabled={!ok}
          className={clsx("btn !btn-ghost self-end btn-xs", {
            "opacity-40": !ok,
            underline: ok,
          })}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default SidebarFooter;
