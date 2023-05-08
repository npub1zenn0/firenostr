import {
  BehaviorSubject,
  ReplaySubject,
  combineLatestWith,
  distinct,
  map,
  scan,
} from "rxjs";

export const rawSources$ = new ReplaySubject<string>();

export const selectedSources$ = new BehaviorSubject<string[]>([]);

export const sources$ = rawSources$.pipe(
  distinct(),
  scan((acc, v) => acc.concat(v), [] as string[]),
  combineLatestWith(selectedSources$),
  map(([sources, selected]) =>
    sources.map((s) => ({
      source: s,
      selected: selected.includes(s),
    }))
  )
);

export const addSource = (source: string, enabled: boolean = true) => {
  rawSources$.next(source);
  if (enabled) {
    selectedSources$.next(selectedSources$.value.concat(source));
  }
};
