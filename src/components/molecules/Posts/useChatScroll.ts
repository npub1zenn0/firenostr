import { useCallback, useLayoutEffect, useRef } from "react";
import { useIntersectionObserver } from "@react-hookz/web";

function scrollBottom(ref?: Element | null, behavior?: "smooth") {
  if (!ref) {
    return;
  }
  ref.scroll({
    top: ref.scrollHeight,
    behavior,
  });
  if (behavior === "smooth") {
    // Scroll again because smooth scroll sometimes gets left behind immediately.
    setTimeout(() => {
      ref.scroll({
        top: ref.scrollHeight,
        // @ts-ignore
        behavior: "instant",
      });
    }, 300);
  }
}

export const useChatScroll = (itemsCount: number) => {
  // Typing this is impossible.
  const ref = useRef<Element>(null);
  const anchorRef = useRef(null);
  const usedUp = useRef(false);

  // Scrolling has to be kicked off once.
  useLayoutEffect(() => {
    if (!ref.current || usedUp.current) {
      return;
    }
    const el = ref.current;
    if (el.scrollHeight > el.getBoundingClientRect().bottom) {
      scrollBottom(el);
      usedUp.current = true;
    }
  }, [itemsCount]);

  const scrollToBottom = useCallback(() => {
    scrollBottom(ref.current, "smooth");
  }, []);

  const intersection = useIntersectionObserver(anchorRef);

  return {
    ref: ref as any,
    anchorProps: {
      className: "[overflow-anchor:auto] h-px !m-0 !p-0",
      ref: anchorRef,
    },
    itemProps: {
      className: "[overflow-anchor:none]",
    },
    scrollToBottom,
    isScrolledToBottom: intersection?.isIntersecting,
  };
};
