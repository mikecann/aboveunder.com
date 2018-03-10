import * as React from "react";
import { IPrint } from "../../lib/types";
import { Marker, InfoWindow } from "react-google-maps";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";

interface IMapMarkerProps {
    position: google.maps.LatLng,
    print?: IPrint
}

interface IMapMarkerState {
    isOpen: boolean;
}

export class MyMapMarker extends React.Component<IMapMarkerProps, IMapMarkerState> {

    constructor(props: IMapMarkerProps) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    render() {
        const { position, print } = this.props;
        const isOpen = this.state.isOpen;
        return <Marker
            position={position}
            onClick={() => this.setState({ isOpen: true })}>

            {isOpen ?
                <InfoWindow onCloseClick={() => this.setState({ isOpen: false })}>
                    <div>{
                        print ? this.renderMarker(print)  : null
                    }
                    </div>
                </InfoWindow>
                : null}

        </Marker>;
    }

    renderMarker(print:IPrint) {
        return <Link to={`/print/${print.id}`}>
            <Image rounded src={print.thumb} 
                style={{ marginTop: "1em", marginBottom: "1em", maxWidth: 300 }}
                label={{ content: print.title, ribbon: true }}
            />
        </Link>
    }

}