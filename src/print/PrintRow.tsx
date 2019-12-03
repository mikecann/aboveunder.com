import * as React from "react";
import { Button, Icon, Dimmer, Loader } from "semantic-ui-react";
import ReactImageMagnify from "react-image-magnify";
import { IPrint } from "../lib/types";
import { useWindowSize } from "../hooks/useWindowSize";

interface Props {
  print: IPrint;
}

export function PrintRow({ print }: Props) {
  const [loadState, setLoadState] = React.useState(0);
  const { innerHeight } = useWindowSize();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#222",
        height: innerHeight - 40,
        paddingTop: 20,
        paddingBottom: 20,
      }}
    >
      {/* <Dimmer active={loadState == 0} inverted>
        <Loader />
      </Dimmer> */}

      <a href={print.image}>
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onLoad={() => setLoadState(loadState + 1)}
          src={loadState == 0 ? print.thumb : print.image}
        />
      </a>

      {/* <a href={print.image} style={{ width: "100%", height: "100%", objectFit: "contain" }}>
        <ReactImageMagnify
          alt={print.title}
          hoverDelayInMs={100}
          style={{
            cursor: "zoom-in",
            boxShadow: "0 5px 10px 0 rgba(34,36,38,.35)",
          }}
          enlargedImagePosition="over"
          smallImage={{
            src: loadState == 0 ? print.thumb : print.image,
            isFluidWidth: true,
            onLoad: () => setLoadState(loadState + 1),
          }}
          largeImage={{
            src: loadState == 0 ? print.thumb : print.image,
            width: 1600,
            height: 1199,
          }}
        /> 

        <Button icon size="tiny" style={{ top: 10, right: 20, position: "absolute" }}>
          <Icon name="expand" />
        </Button>
      </a>
      */}
    </div>
  );
}
