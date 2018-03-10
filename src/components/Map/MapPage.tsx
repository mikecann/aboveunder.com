import * as React from "react";
import { Segment, Container, Header } from "semantic-ui-react";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import * as _ from "lodash";
import GoogleMap from "react-google-maps/lib/components/GoogleMap";
import { ComposedMyMap } from "./MyMap";
import { IMyMapMarker } from "./IMyMapMarker";
import { IPrint } from "../../lib/types";
import { CommonPageLayout } from "../CommonPageLayout";

interface IProps {
  prints: IPrint[];
}

interface IState {
  center: google.maps.LatLngLiteral;
  markers: IMyMapMarker[];
}

export class MapPage extends React.Component<IProps, IState> {

  searchBox: SearchBox;
  map: GoogleMap;

  constructor(props: IProps) {
    super(props);
    this.state = {
      center: { lat: -34.397, lng: 150.644 },
      markers: []
    }
  }

  render() {

    const key = "AIzaSyBCVEVAJP-manM_C8v8q9s3lAblDhgaoIM";
    const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`

    return <CommonPageLayout activeMenu="home">

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>
          <Header as="h1">Above Under Photo Map</Header>

          <div style={{ width: "100%", height: 600 }}>
            <ComposedMyMap
              isMarkerShown
              googleMapURL={mapUrl}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `600px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              onPlacesChanged={this.onMapPlacesChanged}
              onSearchBoxMounted={ref => this.searchBox = ref}
              onMapMounted={this.onMapMounted}
              center={this.state.center}
              markers={this.state.markers}
            />

          </div>

        </Container>
      </Segment>

    </CommonPageLayout>
  }

  onMapMounted = (ref: GoogleMap) => {
    this.map = ref;
    const prints = this.props.prints.filter(p => p.gps);
    this.setState({
      markers: prints.map(p => ({
        position: new google.maps.LatLng((p.gps as any).lat, (p.gps as any).lng),
        print: p
      }))
    });
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
      center: nextCenter,
      markers: nextMarkers,
    });

    this.map.fitBounds(bounds);
  }
}
