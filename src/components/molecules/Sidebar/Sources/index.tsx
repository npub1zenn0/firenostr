"use client";
import { FC, useEffect } from "react";
import { useObservableState } from "observable-hooks";
import { selectedSources$, sources$ } from "@/data/nostr/sources";
import clsx from "clsx";

const lsKey = "selectedSources$";

const Sources: FC<{}> = ({}) => {
  const sources = useObservableState(sources$, []);
  useEffect(() => {
    localStorage.setItem(lsKey, JSON.stringify(sources));
  }, [sources]);
  return (
    <ul className="w-full">
      {sources.map((s) => (
        <li className="flex" key={s.source}>
          <label
            className={"label hover:text-base-content w-full"}
            title={s.source}
          >
            <span
              className={clsx("truncate w-3/4 overflow-hidden", {
                "opacity-60": !s.selected,
              })}
            >
              {s.source.replace(/^wss:\/\//, "")}
            </span>
            <input
              type="checkbox"
              className="checkbox"
              checked={s.selected}
              onChange={() => {
                if (s.selected) {
                  selectedSources$.next(
                    selectedSources$.value.filter((v) => v !== s.source)
                  );
                } else {
                  selectedSources$.next([...selectedSources$.value, s.source]);
                }
              }}
            />
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Sources;
