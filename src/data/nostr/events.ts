import { Event } from "nostr-tools";
import { scan, distinct, map, withLatestFrom, combineLatestWith } from "rxjs";
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

const uniqueEvents$ = rawEvents$.pipe(
  distinct((v) => v.event.id),
  map((e) => e.event)
);

export type MultiSourceNEvent = {
  sources: string[];
  event: Event;
};

const events$ = uniqueEvents$.pipe(
  withLatestFrom(eventSources$),
  map(([event, sources]) => ({
    event,
    sources: sources[event.id],
  }))
);

const eventsSoFar$ = events$.pipe(
  scan(
    (acc, event) =>
      // Drop existing, put in new one.
      acc.filter((e) => e.event.id !== event.event.id).concat(event),
    [] as MultiSourceNEvent[]
  )
);

export const selectedEvents$ = eventsSoFar$.pipe(
  combineLatestWith(selectedSources$),
  map(([events, sources]) =>
    events.filter((event) => event.sources.some((s) => sources.includes(s)))
  )
);
