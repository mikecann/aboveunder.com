import * as React from "react";
import { IPrint, IPrintOptionSize, IPrintOption } from '../lib/types';
import { Button, Dropdown, Segment, Container, Header, Grid, Image, Icon } from "semantic-ui-react";
import * as moment from "moment";
import { getPrintOptionOrDefault, getPrintSizeOrDefault } from "../lib/db";
import Router from 'next/router'

interface IProps {
  print: IPrint,
  url: string,
  initialPrintOption?: string,
  initialPrintSize?: string
}

interface IState {
  selectedPrintOption?: IPrintOption;
  selectedPrintSize?: IPrintOptionSize;
}

export class PrintPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    const { print, initialPrintOption, initialPrintSize } = props;
    const option = getPrintOptionOrDefault(print, initialPrintOption);
    const size = getPrintSizeOrDefault(option, initialPrintSize);
    this.state = {
      selectedPrintOption: option,
      selectedPrintSize: size
    }
  }

  render() {
    const { print } = this.props;
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

    return <div>

      {/* <Container>
          <Segment>
          <Breadcrumb>
            <Breadcrumb.Section link>Shop</Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section link>{product.title}</Breadcrumb.Section>
          </Breadcrumb>
          </Segment>
        </Container> */}

      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>

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
                      data-item-id={print.id}
                      data-item-name={print.title}
                      data-item-image={print.thumb}
                      data-item-description={print.description}
                      data-item-url={this.pageUrl}
                      data-item-weight={selectedPrintSize.weight}
                      data-item-price={selectedPrintSize.priceAUD}
                      data-item-custom1-name="Notes to us"
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

    </div>


  }

  handleSelectedPrintOptionChange = (e: any, dropdown: any) => {

    const product = this.props.print;
    const option = product.printOptions.find(o => o.id == dropdown.value);
    if (option == null)
      return;

    console.log("Selected print option changed", option);

    const size = option.sizes[0];
    this.setState({
      selectedPrintOption: option,
      selectedPrintSize: size
    });

    this.updatePath(product, option, size);
  }

  get pageUrl() {
    const product = this.props.print;
    const option = this.state.selectedPrintOption as IPrintOption;
    const size = this.state.selectedPrintSize as IPrintOptionSize
    return `${process.env.ROOT_URL}/print/${product.id}/${option.id}/${size.id}`;
  }

  handleSelectedPrintSizeChange = (e: any, dropdown: any) => {

    const product = this.props.print;
    const option = this.state.selectedPrintOption as IPrintOption;
    var size = option.sizes.find(o => o.id == dropdown.value);
    if (size == null)
      return;

    console.log("Selected print size changed", size);

    this.setState({
      selectedPrintSize: size
    })

    this.updatePath(product, option, size);
  }

  updatePath(product: IPrint, option: IPrintOption, size: IPrintOptionSize) {  
    Router.push("/print", `/print/${product.id}/${option.id}/${size.id}`, { shallow: true }); 
  }

}