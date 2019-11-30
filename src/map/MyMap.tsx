import * as React from "react";
import { GoogleMap, withScriptjs } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { MyMapMarker } from "./MyMapMarker";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import { IMyMapMarker } from "./IMyMapMarker";
import { IPrint } from "../lib/types";

interface IMyMapProps {
  isMarkerShown: boolean;
  onPlacesChanged: () => void;
  onSearchBoxMounted: (ref: SearchBox) => void;
  onMapMounted: (ref: GoogleMap) => void;
  center: google.maps.LatLngLiteral;
  markers: IMyMapMarker[];
  initiallyOpenMarker?: IMyMapMarker;
  zoom: number;
  selectedPrintChanged: (print?: IPrint) => void;
}

interface IState {
  openMarker?: IMyMapMarker;
}

export function MyMap({
  selectedPrintChanged,
  isMarkerShown,
  onPlacesChanged,
  onSearchBoxMounted,
  center,
  markers,
  initiallyOpenMarker,
  onMapMounted,
  zoom,
}: IMyMapProps) {
  const [openMarker, setOpenMarker] = React.useState<IMyMapMarker>();

  React.useEffect(() => {
    setOpenMarker(undefined);
  }, [markers.length]);

  const onMarkerClicked = (marker: IMyMapMarker) => {
    setOpenMarker(marker);
    selectedPrintChanged(marker.print);
  };

  const onMarkerClosed = () => {
    setOpenMarker(undefined);
    selectedPrintChanged(undefined);
  };

  return (
    <GoogleMap ref={onMapMounted} zoom={zoom} center={center}>
      <SearchBox
        ref={onSearchBoxMounted}
        controlPosition={google.maps.ControlPosition.TOP_CENTER}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `15px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      {markers.map((marker, index) => (
        <MyMapMarker
          key={index}
          position={marker.position}
          print={marker.print}
          isOpen={marker == openMarker}
          onClick={() => onMarkerClicked(marker)}
          onCloseClick={onMarkerClosed}
        />
      ))}
    </GoogleMap>
  );
}

export const ComposedMyMap = withScriptjs(withGoogleMap(MyMap));
