import * as React from "react";
import { GoogleMap, withScriptjs } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { MyMapMarker } from "./MyMapMarker";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import { IMyMapMarker } from "./IMyMapMarker";

interface IMyMapProps {
    isMarkerShown: boolean;
    onPlacesChanged: () => void;
    onSearchBoxMounted: (ref: SearchBox) => void;
    onMapMounted: (ref: GoogleMap) => void;
    center: google.maps.LatLngLiteral;
    markers: IMyMapMarker[];
  }

export class MyMap extends React.Component<IMyMapProps, {}> {

    constructor(props: IMyMapProps) {
      super(props);
      this.state = {
      }
    }
  
    render() {
      return <GoogleMap
        ref={this.props.onMapMounted}
        defaultZoom={4}
        center={this.props.center}
      >
        <SearchBox
          ref={this.props.onSearchBoxMounted}
          //bounds={props.bounds}
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
          <MyMapMarker key={index} position={marker.position} print={marker.print} />
        )}
      </GoogleMap>
    }
  }
  
  export const ComposedMyMap = withScriptjs(withGoogleMap(MyMap));