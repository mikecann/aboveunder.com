import * as React from "react";
import { useWindowSize } from "../hooks/useWindowSize";

/** Replaces semantic-ui `Responsive` (removed in v2) using viewport width. */
export function MatchMediaWidth({
  minWidth,
  maxWidth,
  children,
}: {
  minWidth?: number;
  maxWidth?: number;
  children: React.ReactNode;
}) {
  const { innerWidth } = useWindowSize();
  if (maxWidth !== undefined && innerWidth > maxWidth) return null;
  if (minWidth !== undefined && innerWidth < minWidth) return null;
  return <>{children}</>;
}
