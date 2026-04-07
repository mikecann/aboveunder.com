/// <reference types="google.maps" />
import * as React from "react";
import { IMyMapMarker } from "./IMyMapMarker";
import { ComposedMyMap } from "./MyMap";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { GoogleMap } from "react-google-maps";
import { IPrint } from "../lib/types";

interface IProps {
  prints: IPrint[];
  initialPrintId?: string;
  selectedPrintChanged?: (print?: IPrint) => void;
  height?: number;
  hideSearch?: boolean;
}

interface IState {
  center: google.maps.LatLngLiteral;
  markers: IMyMapMarker[];
  zoom: number;
  initiallyOpenMarker?: IMyMapMarker;
}

// searchBox: SearchBox;
//   map: GoogleMap;
//   state = {
//     center: { lat: -34.397, lng: 150.644 },
//     markers: [],
//     zoom: 4,
//     initiallyOpenMarker: undefined
//   };

export function PrintsMap({
  prints,
  initialPrintId,
  selectedPrintChanged,
  height,
  hideSearch,
}: IProps) {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!key)
    return (
      <div
        style={{
          alignItems: "center",
          background: "#f8f8f8",
          color: "#666",
          display: "flex",
          height: height ? `${height}px` : "800px",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        Map unavailable until the Google Maps key is set in `.env.local`
        as `VITE_GOOGLE_MAPS_API_KEY`.
      </div>
    );
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=places`;

  const searchboxRef = React.useRef<SearchBox>();

  const [map, setMap] = React.useState<GoogleMap>();

  const [state, setState] = React.useState<IState>({
    center: { lat: 0, lng: 0 },
    markers: [],
    zoom: 0,
  });

  // const selectedPrintChanged = (print: IPrint) => {
  //   if (this.props.selectedPrintChanged) this.props.selectedPrintChanged(print);
  // };

  React.useEffect(() => {
    if (!map) return;

    const filteredPrints = prints.filter(p => p.gps);
    const selectedPrint = filteredPrints.find(p => p.id == initialPrintId);
    const markers = filteredPrints.map(p => ({
      position: new google.maps.LatLng((p.gps as any).lat, (p.gps as any).lng),
      print: p,
    }));
    const selectedMarker = markers.find(m => m.print == selectedPrint);
    const center = selectedMarker
      ? {
          lat: selectedMarker.position.lat(),
          lng: selectedMarker.position.lng(),
        }
      : { lat: -26.7839429, lng: 133.0482886 };
    const zoom = selectedMarker ? 12 : 4;

    setState({
      center,
      markers,
      zoom,
      initiallyOpenMarker: selectedMarker,
    });
  }, [map, prints, initialPrintId]);

  const onMapPlacesChanged = () => {
    if (!searchboxRef.current) throw new Error(`no searchbox`);
    if (!map) throw new Error(`no map`);

    const places = searchboxRef.current.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (!place.geometry) throw new Error(`no place geometry`);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else if (place.geometry.location) {
        bounds.extend(place.geometry.location);
      }
    });

    const nextMarkers = places.map(place => {
      if (!place.geometry) throw new Error(`no place geometry`);
      return {
        position: place.geometry.location,
      };
    });

    const first = nextMarkers[0];
    const nextCenter: google.maps.LatLngLiteral = first?.position
      ? { lat: first.position.lat(), lng: first.position.lng() }
      : state.center;

    setState({
      ...state,
      center: nextCenter,
    });

    map.fitBounds(bounds);
  };

  const MapView = ComposedMyMap as unknown as React.ComponentType<Record<string, unknown>>;

  return (
    <MapView
      isMarkerShown
      hideSearch={hideSearch}
      googleMapURL={mapUrl}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: height ? height + "px" : `800px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={onMapPlacesChanged}
      onSearchBoxMounted={(ref: SearchBox) => (searchboxRef.current = ref)}
      onMapMounted={setMap}
      initiallyOpenMarker={state.initiallyOpenMarker}
      center={state.center}
      markers={state.markers}
      selectedPrintChanged={selectedPrintChanged ? selectedPrintChanged : () => {}}
      zoom={state.zoom}
    />
  );
}
