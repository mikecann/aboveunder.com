import { useEffect } from "react";

export function useScrollToTopOnEnter() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
}
