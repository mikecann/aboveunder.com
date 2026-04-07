import type { ReactNode } from "react";

declare module "react-google-maps" {
  interface GoogleMapProps {
    children?: ReactNode;
  }
}

declare module "react-google-maps/lib/components/places/SearchBox" {
  interface SearchBoxProps {
    children?: ReactNode;
  }
}

declare module "react-google-maps/lib/components/Marker" {
  interface MarkerProps {
    children?: ReactNode;
  }
}

declare module "react-google-maps/lib/components/InfoWindow" {
  interface InfoWindowProps {
    children?: ReactNode;
  }
}
