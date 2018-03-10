import * as React from "react";
import { IPrint } from "../../lib/types";
import { IMyMapMarker } from "./IMyMapMarker";
import { ComposedMyMap } from "./MyMap";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { GoogleMap } from "react-google-maps";
import * as _ from "lodash";

interface IProps {
    prints: IPrint[];
    initialPrintId?: string;
    selectedPrintChanged?: (print?: IPrint) => void;
}

interface IState {
    center: google.maps.LatLngLiteral;
    markers: IMyMapMarker[];
    zoom: number;
    initiallyOpenMarker?: IMyMapMarker;
}

export class PrintsMap extends React.Component<IProps, IState> {

    searchBox: SearchBox;
    map: GoogleMap;
    state = {
        center: { lat: -34.397, lng: 150.644 },
        markers: [],
        zoom: 4,
        initiallyOpenMarker: undefined
    }

    render() {
        const key = "AIzaSyBCVEVAJP-manM_C8v8q9s3lAblDhgaoIM";
        const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=places`

        return <ComposedMyMap
            isMarkerShown
            googleMapURL={mapUrl}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `800px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onPlacesChanged={this.onMapPlacesChanged}
            onSearchBoxMounted={ref => this.searchBox = ref}
            onMapMounted={this.onMapMounted}
            initiallyOpenMarker={this.state.initiallyOpenMarker}
            center={this.state.center}
            markers={this.state.markers}
            selectedPrintChanged={this.selectedPrintChanged}
            zoom={this.state.zoom}
        />
    }

    selectedPrintChanged = (print:IPrint) => {
        if (this.props.selectedPrintChanged)
            this.props.selectedPrintChanged(print);
    }

    onMapMounted = (ref: GoogleMap) => {
        this.map = ref;

        const prints = this.props.prints.filter(p => p.gps);
        const selectedPrint = prints.find(p => p.id == this.props.initialPrintId);
        const markers = prints.map(p => ({
            position: new google.maps.LatLng((p.gps as any).lat, (p.gps as any).lng),
            print: p
        }));
        const selectedMarker = markers.find(m => m.print == selectedPrint);
        const center = selectedMarker ?
            { lat: selectedMarker.position.lat(), lng: selectedMarker.position.lng() } :
            { lat: -26.7839429, lng: 133.0482886 };
        const zoom = selectedMarker ? 6 : 4;

        this.setState({ center, markers, zoom, initiallyOpenMarker: selectedMarker });
    }

    onMapPlacesChanged = () => {
        const places = this.searchBox.getPlaces();
        const bounds = new google.maps.LatLngBounds();

        places.forEach(place => {
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
            } else {
                bounds.extend(place.geometry.location)
            }
        });
        const nextMarkers = places.map(place => ({
            position: place.geometry.location
        }));
        const nextCenter: google.maps.LatLngLiteral = _.get(nextMarkers, '0.position', this.state.center);

        this.setState({
            center: nextCenter
        });

        this.map.fitBounds(bounds);
    }

}
