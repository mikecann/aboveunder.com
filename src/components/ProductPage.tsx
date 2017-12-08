import * as React from "react";
import { IProduct, IPrintOptionSize, IPrintOption } from "../lib/types";
import { Button, Dropdown, Segment, Container, Header } from "semantic-ui-react";

interface IProps {
  product: IProduct,
  url: string
}

interface IState {
  selectedPrintOption?: IPrintOption;
  selectedPrintSize?: IPrintOptionSize;
}

export class ProductPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = {
      selectedPrintOption: props.product.printOptions[0],
      selectedPrintSize: props.product.printOptions[0].sizes[0]
    }
  }

  render() {
    const { product } = this.props;
    const selectedPrintOption = this.state.selectedPrintOption as IPrintOption;
    const selectedPrintSize = this.state.selectedPrintSize as IPrintOptionSize;

    const selectedPrintOptions = product.printOptions.map(o => ({
      text: o.name,
      value: o.name
    }));

    const selectedPrintSizes = selectedPrintOption.sizes.map(o => ({
      text: `${o.widthInches}" x ${o.heightInches}"`,
      value: o.name
    }));

    console.log("props", this.props)

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
          <Header as="h1">{product.title}</Header>

          <div>
            <img width={800} src={product.image} />
          </div>

          <h1>{product.title}</h1>

          <p dangerouslySetInnerHTML={{__html: product.description}}></p>

          <div>
            <Dropdown fluid selection options={selectedPrintOptions}
              value={selectedPrintOption.name}
              onChange={this.handleSelectedPrintOptionChange} />

            <Dropdown fluid selection options={selectedPrintSizes}
              value={selectedPrintSize.name}
              onChange={this.handleSelectedPrintSizeChange} />

          </div>

          <div>

            <Button className="snipcart-add-item"
              data-item-id={product.id}
              data-item-name={product.title}
              data-item-image={product.thumb}
              data-item-description={product.description}
              data-item-url={"/"}
              data-item-price={selectedPrintSize.priceAUD}>
              Buy it for $ {selectedPrintSize.priceAUD} AUD
          </Button>

          </div>

        </Container>
      </Segment>

    </div>


  }

  handleSelectedPrintOptionChange = (e: any, dropdown: any) => {
    var option = this.props.product.printOptions.find(o => o.name == dropdown.value);
    if (option == null)
      return;

    console.log("Selected print option changed", option);

    this.setState({
      selectedPrintOption: option,
      selectedPrintSize: option.sizes[0]
    })
  }


  handleSelectedPrintSizeChange = (e: any, dropdown: any) => {
    const selectedPrintOption = this.state.selectedPrintOption as IPrintOption;
    var option = selectedPrintOption.sizes.find(o => o.name == dropdown.value);
    if (option == null)
      return;

    console.log("Selected print size changed", option);

    this.setState({
      selectedPrintSize: option
    })
  }

}