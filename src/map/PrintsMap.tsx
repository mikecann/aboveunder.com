import * as React from "react";
import { IMyMapMarker } from "./IMyMapMarker";
import { ComposedMyMap } from "./MyMap";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { GoogleMap } from "react-google-maps";
import * as _ from "lodash";
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
  const key = "AIzaSyBCVEVAJP-manM_C8v8q9s3lAblDhgaoIM";
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
  }, [map]);

  const onMapPlacesChanged = () => {
    if (!searchboxRef.current) throw new Error(`no searchbox`);
    if (!map) throw new Error(`no map`);

    const places = searchboxRef.current.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (!place.geometry) throw new Error(`no place geometry`);

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });

    const nextMarkers = places.map(place => {
      if (!place.geometry) throw new Error(`no place geometry`);
      return {
        position: place.geometry.location,
      };
    });

    const nextCenter: google.maps.LatLngLiteral = _.get(nextMarkers, "0.position", state.center);

    setState({
      ...state,
      center: nextCenter,
    });

    map.fitBounds(bounds);
  };

  return (
    <ComposedMyMap
      isMarkerShown
      hideSearch={hideSearch}
      googleMapURL={mapUrl}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: height ? height + "px" : `800px` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      onPlacesChanged={onMapPlacesChanged}
      onSearchBoxMounted={ref => (searchboxRef.current = ref)}
      onMapMounted={setMap}
      initiallyOpenMarker={state.initiallyOpenMarker}
      center={state.center}
      markers={state.markers}
      selectedPrintChanged={selectedPrintChanged ? selectedPrintChanged : () => {}}
      zoom={state.zoom}
    />
  );
}
