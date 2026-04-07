import type { ComponentType } from "react";
import { Grid as GlsGrid, Content as GlsGridCell } from "gls";
import {
  Vertical as GlsVertical,
  Responsive as GlsResponsive,
  Stretch as GlsStretch,
  VerticalSpacer as GlsVerticalSpacer,
} from "gls/lib";

/** gls types pull in React DOMAttribute noise; loosen for TS + React 18. */
type Loose = ComponentType<any>;

export const Grid = GlsGrid as Loose;
export const GridCell = GlsGridCell as Loose;
export const Vertical = GlsVertical as Loose;
export const Responsive = GlsResponsive as Loose;
export const Stretch = GlsStretch as Loose;
export const VerticalSpacer = GlsVerticalSpacer as Loose;
