import { Event, Filter, Relay, Sub, relayInit } from "nostr-tools";
import { Subject, from, filter, race, take } from "rxjs";
import { addSource, selectedSources$ } from "./sources";

export type NEvent = {
  source: string;
  event: Event;
};

export const rawEvents$ = new Subject<NEvent>();

type NSub = {
  source: string;
  sub: Sub;
};

const relays = {} as Record<string, Relay>;
const subs = {} as Record<string, NSub>;

const now = () => Math.floor(Date.now() / 1000);

const subscribe = (relay: Relay) => {
  const sub = relay.sub([
    {
      kinds: [1],
      since: now(),
    },
  ]);
  subs[relay.url] = { sub, source: relay.url };
  sub.on("event", (event) =>
    rawEvents$.next({
      event,
      source: relay.url,
    })
  );
};

export const addSubscription = (source: string) => {
  if (subs[source]) {
    return;
  }
  const relay = relayInit(source);
  relays[relay.url] = relay;
  console.log("Connecting to relay", source);
  relay.connect();
  relay.on("disconnect", () => {
    console.log("Reconnecting", relay.url);
    relay.connect();
    subs[relay.url].sub.unsub();
    subscribe(relay);
  });
  subscribe(relay);
};

export const getEvent = (_filter: Filter) =>
  race(Object.values(relays).map((s) => from(s.get(_filter)))).pipe(
    filter(Boolean),
    take(1)
    //
  );

let initialized = false;
export const initializeRelays = () => {
  if (initialized) {
    return;
  }
  initialized = true;
  selectedSources$.subscribe((sources) =>
    sources.forEach((source) => addSubscription(source))
  );

  // Stored in localStorage.
  try {
    const ls = localStorage.getItem("selectedSources$");
    const x = JSON.parse(ls || "[]") as any;
    if (x.length > 0) {
      // @ts-expect-error -- not finna bother
      x.forEach(({ source, selected }) => addSource(source, selected));
      return;
    }
  } catch {}

  // Defaults
  addSource("wss://nos.lol");
  [
    "wss://purplepag.es",
    "wss://nostr-pub.wellorder.net",
    "wss://nostr.wine",
    "wss://relay.damus.io",
    "wss://bitcoiner.social",
    "wss://btc-italia.online",
    "wss://deschooling.us",
    "wss://freespeech.casa",
    "wss://global.relay.red",
    "wss://noster.online",
    "wss://no-str.org",
    "wss://relay.nostr.ai",
    "wss://rellay.valera.co",
    "wss://rs.nostr-x.com",
  ].forEach((v) => addSource(v, false));
};
