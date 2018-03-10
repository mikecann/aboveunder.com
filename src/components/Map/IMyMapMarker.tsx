import { IPrint } from "../../lib/types";

export interface IMyMapMarker {
    position: google.maps.LatLng,
    print?: IPrint
  }