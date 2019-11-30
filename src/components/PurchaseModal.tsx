import * as React from "react";
import {
  Segment,
  Grid,
  Header,
  Image,
  Container,
  Icon,
  Modal,
  Button,
  Message,
} from "semantic-ui-react";
import { IPrintOptionSize, IPrintOption, IPrint } from "../lib/types";

type Props = {
  print: IPrint;
  size: IPrintOptionSize;
  option: IPrintOption;
  onClose: () => any;
};

export const PurchaseModal = ({ print, size, option, onClose }: Props) => (
  <Modal open={true} size="small" onClose={onClose}>
    <Modal.Header>Email to Purchase</Modal.Header>
    <Modal.Content image>
      <Image wrapped size="medium" src={print.thumb} />
      <Modal.Description>
        <Header>{print.title}</Header>
        <p>
          Unfortunately due to hosting costs I can no longer offer automatic ordering via my
          website.
        </p>
        <p>
          Fear not, you can still order by email. Simply email me at:{" "}
          <a href="mailto:mike@aboveunder.com">mike@aboveunder.com</a> with the following details:
        </p>
        <Message info>
          <strong>Title: </strong> {print.title} <br />
          <strong>Option: </strong> {option.name} <br />
          <strong>Size: </strong> {size.widthInches} x {size.heightInches} inches
          <br />
        </Message>
        <p>I will get back to you as soon as you can with info on how to proceed.</p>
        <p>
          <Button
            as="a"
            href="mailto:mike@aboveunder.com?subject='Above Under Print Order'"
            primary
          >
            Open Email
          </Button>
        </p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);
