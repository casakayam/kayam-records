import { useEffect, useRef } from "react";

// Single rAF-throttled scroll listener per component.
// The callback ref pattern ensures the latest callback is always used
// without re-registering the listener on re-renders.
export function useScrollPosition(callback: (scrollY: number) => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        callbackRef.current(window.scrollY);
        rafId = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialize with current position
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []); // stable — listener registered once, callback always current via ref
}
