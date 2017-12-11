import * as React from "react";
import { IProduct, IPrintOptionSize, IPrintOption } from '../lib/types';
import { Button, Dropdown, Segment, Container, Header, Grid, Image, Icon } from "semantic-ui-react";
import * as moment from "moment";
import { getPrintOptionOrDefault, getPrintSizeOrDefault } from "../lib/db";
import Router from 'next/router'

interface IProps {
  product: IProduct,
  url: string,
  initialPrintOption?: string,
  initialPrintSize?: string
}

interface IState {
  selectedPrintOption?: IPrintOption;
  selectedPrintSize?: IPrintOptionSize;
}

export class ProductPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    const { product, initialPrintOption, initialPrintSize } = props;
    const option = getPrintOptionOrDefault(product, initialPrintOption);
    const size = getPrintSizeOrDefault(option, initialPrintSize);
    this.state = {
      selectedPrintOption: option,
      selectedPrintSize: size
    }
  }

  render() {
    const { product } = this.props;
    const selectedPrintOption = this.state.selectedPrintOption as IPrintOption;
    const selectedPrintSize = this.state.selectedPrintSize as IPrintOptionSize;

    const selectedPrintOptions = product.printOptions.map(o => ({
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
                <a href={product.image} style={{ cursor: "zoom-in" }}>
                  <Image src={product.image} rounded />
                </a>
              </Grid.Column>
              <Grid.Column width={6}>
                <Segment>

                  <Header as="h1">
                    {product.title}
                    <Header.Subheader>
                      {moment(product.dateCreated).calendar()}
                    </Header.Subheader>
                  </Header>

                  <p dangerouslySetInnerHTML={{ __html: product.description }} style={{ marginBottom: "2em" }}></p>

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
                      data-item-id={product.id}
                      data-item-name={product.title}
                      data-item-image={product.thumb}
                      data-item-description={product.description}
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

    const product = this.props.product;
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
    const product = this.props.product;
    const option = this.state.selectedPrintOption as IPrintOption;
    const size = this.state.selectedPrintSize as IPrintOptionSize
    return `${process.env.ROOT_URL}/product?id=${product.id}&options=${option.id}&size=${size.id}`;
  }

  handleSelectedPrintSizeChange = (e: any, dropdown: any) => {

    const product = this.props.product;
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

  updatePath(product: IProduct, option: IPrintOption, size: IPrintOptionSize) {

    // var url = `/product/${product.id}?option=${option.id}&size=${size.id}`;
    // Router.push(url, url, { shallow: true })
    Router.push({
      pathname: "/product",
      query: {
        id: product.id,
        option: option.id,
        size: size.id
      }
    })
  }

}