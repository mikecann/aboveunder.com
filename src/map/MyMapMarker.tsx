import * as React from "react";
import { Marker, InfoWindow } from "react-google-maps";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { IPrint } from "../lib/types";

interface IMapMarkerProps {
  position: google.maps.LatLng;
  print?: IPrint;
  isOpen: boolean;
  onClick: () => void;
  onCloseClick: () => void;
}

export class MyMapMarker extends React.Component<IMapMarkerProps, any> {
  render() {
    const { position, print, isOpen, onClick, onCloseClick } = this.props;
    return (
      <Marker position={position} onClick={onClick}>
        {isOpen ? (
          <InfoWindow onCloseClick={onCloseClick}>
            <div>{print ? this.renderMarker(print) : null}</div>
          </InfoWindow>
        ) : null}
      </Marker>
    );
  }

  renderMarker(print: IPrint) {
    return (
      <Link to={`/print/${print.id}`}>
        <Image
          alt={print.title + " icon"}
          rounded
          src={print.thumb}
          style={{ maxWidth: 300 }}
          label={{ content: print.title, ribbon: true }}
        />
      </Link>
    );
  }
}
