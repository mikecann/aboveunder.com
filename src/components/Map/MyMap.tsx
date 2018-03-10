import * as React from "react";
import { GoogleMap, withScriptjs } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { MyMapMarker } from "./MyMapMarker";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import { IMyMapMarker } from "./IMyMapMarker";
import { IPrint } from "../../lib/types";

interface IMyMapProps {
    isMarkerShown: boolean;
    onPlacesChanged: () => void;
    onSearchBoxMounted: (ref: SearchBox) => void;
    onMapMounted: (ref: GoogleMap) => void;
    center: google.maps.LatLngLiteral;
    markers: IMyMapMarker[];
    initiallyOpenMarker?: IMyMapMarker;
    zoom: number;
    selectedPrintChanged: (print?:IPrint)=>void;
}

interface IState 
{
    openMarker?: IMyMapMarker 
}

export class MyMap extends React.Component<IMyMapProps, IState> {

    state : IState = {}

    componentWillReceiveProps(nextProps:IMyMapProps)
    {
        if (nextProps.markers.length != this.props.markers.length)
            this.setState({ openMarker: nextProps.initiallyOpenMarker });
    }

    render() {

        const openMarker = this.state.openMarker;

        return <GoogleMap
            ref={this.props.onMapMounted}
            zoom={this.props.zoom}
            center={this.props.center}
        >
            <SearchBox
                ref={this.props.onSearchBoxMounted}
                controlPosition={google.maps.ControlPosition.TOP_CENTER}
                onPlacesChanged={this.props.onPlacesChanged}
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
            {this.props.markers.map((marker, index) =>
                <MyMapMarker
                    key={index}
                    position={marker.position}
                    print={marker.print}
                    isOpen={marker == openMarker}
                    onClick={() => this.onMarkerClicked(marker)}
                    onCloseClick={this.onMarkerClosed}
                />
            )}
        </GoogleMap>
    }

    onMarkerClicked = (marker:IMyMapMarker) => {
        this.setState({ openMarker: marker });
        this.props.selectedPrintChanged(marker.print);               
    }

    onMarkerClosed = () => {
        this.setState({ openMarker: undefined });
        this.props.selectedPrintChanged(undefined);
    }
}

export const ComposedMyMap = withScriptjs(withGoogleMap(MyMap));