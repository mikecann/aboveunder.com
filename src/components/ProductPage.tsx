import * as React from "react";
import { IProduct, IPrintOptionSize, IPrintOption } from "../lib/types";
import { Button, Dropdown, Segment, Container, Header, Grid, Image, Icon } from "semantic-ui-react";
import * as moment from "moment";

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

                  <p dangerouslySetInnerHTML={{ __html: product.description }} style={{marginBottom:"2em"}}></p>

                  <div>
                    <Dropdown fluid selection options={selectedPrintOptions}
                      value={selectedPrintOption.name}
                      onChange={this.handleSelectedPrintOptionChange} 
                      style={{marginBottom:"0.5em"}}
                      />

                    <Dropdown fluid selection options={selectedPrintSizes}
                      value={selectedPrintSize.name}
                      onChange={this.handleSelectedPrintSizeChange}
                      style={{marginBottom:"1em"}}
                       />

                  </div>

                  <div>

                    <Button primary className="snipcart-add-item"
                      data-item-id={product.id}
                      data-item-name={product.title}
                      data-item-image={product.thumb}
                      data-item-description={product.description}
                      data-item-url={"/"}
                      data-item-price={selectedPrintSize.priceAUD}>
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