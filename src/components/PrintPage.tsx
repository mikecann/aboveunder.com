import * as React from "react";
import { IPrint, IPrintOptionSize, IPrintOption, IDB } from '../lib/types';
import { Button, Dropdown, Segment, Container, Header, Grid, Image, Icon, Breadcrumb } from "semantic-ui-react";
import * as moment from "moment";
import { getPrintOptionOrDefault, getPrintSizeOrDefault, getPrint } from "../lib/db";
import { CommonPageLayout } from "./CommonPageLayout";
import { match } from "react-router";

interface IProps {
  db: IDB,
  history: any,
  match: match<any>
}

interface IState {
  print?: IPrint;
  selectedPrintOption?: IPrintOption;
  selectedPrintSize?: IPrintOptionSize;
}

export class PrintPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)

    const { db, match } = props;
    const print = getPrint(db, match.params.id);
    const option = getPrintOptionOrDefault(print, match.params.option);
    const size = getPrintSizeOrDefault(option, match.params.size);

    this.state = {
      print,
      selectedPrintOption: option,
      selectedPrintSize: size
    }
  }

  render() {
    const print = this.state.print as IPrint;
    const selectedPrintOption = this.state.selectedPrintOption as IPrintOption;
    const selectedPrintSize = this.state.selectedPrintSize as IPrintOptionSize;

    const selectedPrintOptions = print.printOptions.map(o => ({
      text: o.name,
      value: o.id
    }));

    const selectedPrintSizes = selectedPrintOption.sizes.map(o => ({
      text: `${o.widthInches}" x ${o.heightInches}"`,
      value: o.id
    }));

    return <CommonPageLayout activeMenu="shop">


      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>

          <div style={{ marginBottom: "2em" }}>
            <Breadcrumb size='large'>
              <Breadcrumb.Section link href="/shop"><Icon name="cart" />Shop</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{print.title}</Breadcrumb.Section>
            </Breadcrumb>
          </div>

          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <a href={print.image} style={{ cursor: "zoom-in" }}>
                  <Image src={print.image} rounded />
                </a>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>

                  <Header as="h1">
                    {print.title}
                    <Header.Subheader>
                      {moment(print.dateCreated).calendar()}
                    </Header.Subheader>
                  </Header>

                  <p dangerouslySetInnerHTML={{ __html: print.description }} style={{ marginBottom: "2em" }}></p>

                  <div>
                    <Dropdown fluid selection options={selectedPrintOptions}
                      value={selectedPrintOption.id}
                      onChange={this.handleSelectedPrintOptionChange}
                      style={{ marginBottom: "0.5em" }}
                    />

                    <Dropdown fluid selection options={selectedPrintSizes}
                      value={selectedPrintSize.id}
                      onChange={this.handleSelectedPrintSizeChange}
                      style={{ marginBottom: "1em" }}
                    />

                  </div>

                  <div>

                    <Button primary className="snipcart-add-item"
                      data-item-id={`${print.id}-${selectedPrintOption.id}-${selectedPrintSize.id}`}
                      data-item-name={print.title}
                      data-item-image={print.thumb}
                      data-item-description={print.description}
                      data-item-url={`https://${window.location.hostname}/products.json`}
                      data-item-weight={selectedPrintSize.weight}
                      data-item-price={selectedPrintSize.priceAUD}
                      data-item-custom1-name="Note to Above Under"
                      data-item-custom1-type="textarea"
                    >
                      Buy it for $ {selectedPrintSize.priceAUD} AUD
                      <Icon name='chevron right' />
                    </Button>

                  </div>
                </Segment>
              </Grid.Column>


            </Grid.Row>
          </Grid>
        </Container>
      </Segment>

    </CommonPageLayout>


  }

  handleSelectedPrintOptionChange = (e: any, dropdown: any) => {

    const print = this.state.print as IPrint;
    const option = print.printOptions.find(o => o.id == dropdown.value);
    if (option == null)
      return;

    console.log("Selected print option changed", option);

    const size = option.sizes[0];
    this.setState({
      selectedPrintOption: option,
      selectedPrintSize: size
    });

    this.updatePath(print, option, size);
  }

  handleSelectedPrintSizeChange = (e: any, dropdown: any) => {

    const print = this.state.print as IPrint;
    const option = this.state.selectedPrintOption as IPrintOption;
    var size = option.sizes.find(o => o.id == dropdown.value);
    if (size == null)
      return;

    console.log("Selected print size changed", size);

    this.setState({
      selectedPrintSize: size
    })

    this.updatePath(print, option, size);
  }

  updatePath(product: IPrint, option: IPrintOption, size: IPrintOptionSize) {
    this.props.history.push(`/print/${product.id}/${option.id}/${size.id}`);
  }

}