import { useWindowSize } from "./useWindowSize";

export type ResponsiveMode = "Desktop" | "Tablet" | "Mobile";

export function useResponsive() {
  const { innerWidth } = useWindowSize();

  let mode: ResponsiveMode = "Desktop";

  if (innerWidth < 900) mode = "Tablet";
  if (innerWidth < 550) mode = "Mobile";

  let margin = "4em";

  if (mode == "Tablet") margin = "2em";
  if (mode == "Mobile") margin = "1em";

  return { mode, margin };
}
