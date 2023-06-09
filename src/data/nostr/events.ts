import { Event } from "nostr-tools";
import { scan, map, withLatestFrom, combineLatestWith } from "rxjs";
import { rawEvents$ } from "./connections";
import { selectedSources$ } from "./sources";

const eventSources$ = rawEvents$.pipe(
  scan(
    (acc, { event, source }) => ({
      ...acc,
      [event.id]: [...(acc[event.id] || []), source],
    }),
    {} as Record<string, string[]>
  )
);

export type MultiSourceNEvent = {
  sources: string[];
  event: Event;
};

const events$ = rawEvents$.pipe(
  map((e) => e.event),
  withLatestFrom(eventSources$),
  map(([event, sources]) => ({
    event,
    sources: sources[event.id],
  }))
);

const replaceOrAppend =
  <T>(predicate: (e: T) => boolean, newElement: T) =>
  (arr: T[]) => {
    const idx = arr.findIndex(predicate);
    if (idx === -1) {
      return arr.concat(newElement);
    }
    return [...arr.slice(0, idx), newElement, ...arr.slice(idx + 1)];
  };

const eventsSoFar$ = events$.pipe(
  scan(
    (acc, event) =>
      replaceOrAppend((e) => e.event.id === event.event.id, event)(acc),
    [] as MultiSourceNEvent[]
  )
);

const removeDisabledSources = ([events, sources]: [
  MultiSourceNEvent[],
  string[]
]) => {
  return events.reduce((acc, event) => {
    const newSources = event.sources.filter((s) => sources.includes(s));
    if (newSources.length === 0) {
      return acc;
    }
    return acc.concat({ event: event.event, sources: newSources });
  }, [] as MultiSourceNEvent[]);
};

export const selectedEvents$ = eventsSoFar$.pipe(
  combineLatestWith(selectedSources$),
  map(removeDisabledSources)
);
