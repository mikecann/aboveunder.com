import * as React from "react";
import { IPrint, IPrintOptionSize, IPrintOption, IDB, Printer } from '../lib/types';
import { Button, Dropdown, Segment, Container, Header, Grid, Icon, Breadcrumb, Label, Dimmer, Loader } from "semantic-ui-react";
import * as moment from "moment";
import { getPrintOptionOrDefault, getPrintSizeOrDefault, getPrint } from "../lib/db";
import { CommonPageLayout } from "./CommonPageLayout";
import { match } from "react-router";
import { Link } from "react-router-dom";
import ReactImageMagnify from 'react-image-magnify';
import { wrap } from "normalize-range";
import * as H from 'history';

interface IRouteMatch {
  option?: string;
  size?: string;
  printer?: Printer;
  id?: string;
}

interface IProps {
  db: IDB,
  history: H.History,
  match: match<IRouteMatch>,
  allPrints: IPrint[]
}

interface IState {
  print?: IPrint;
  selectedPrinter?: Printer;
  selectedPrintOption?: IPrintOption;
  selectedPrintSize?: IPrintOptionSize;
  loadState: number;
}

type PrinterDropdownOption = { text: string, value: Printer };
type PrinterDropdownOptions = PrinterDropdownOption[];

const printers: PrinterDropdownOptions = [
  { text: "🌎 Global Printer", value: "printful" },
  { text: "🐨 Australian Printer", value: "fitzgeralds" }
]

export class PrintPage extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
    this.state = this.getInitialState(props);
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState(this.getInitialState(nextProps));
  }

  private getInitialState(props: IProps): IState {
    const { db, match } = props;
    const print = getPrint(db, match.params.id);
    const printer = match.params.printer || "fitzgeralds";
    const option = getPrintOptionOrDefault(print, printer, match.params.option);
    const size = getPrintSizeOrDefault(option, match.params.size);

    return {
      print,
      selectedPrinter: printer,
      selectedPrintOption: option,
      selectedPrintSize: size,
      loadState: 0
    }
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    // Update the path in the browser bar every time we render
    this.updatePath();
  }

  render() {
    const { db } = this.props;
    const { loadState } = this.state;
    const print = this.state.print as IPrint;
    const selectedPrintOption = this.state.selectedPrintOption as IPrintOption;
    const selectedPrintSize = this.state.selectedPrintSize as IPrintOptionSize;
    const selectedPrinter = this.state.selectedPrinter as Printer;
    const printerText = (printers.find(p => p.value == selectedPrinter) as PrinterDropdownOption).text;

    console.log("selectedPrintOption", selectedPrintOption)

    const selectedPrintOptions = print.printOptions[selectedPrinter].map(o => ({
      text: o.name,
      value: o.id
    }));

    const selectedPrintSizes = selectedPrintOption.sizes.map(o => ({
      text: `${o.widthInches}" x ${o.heightInches}"`,
      value: o.id
    }));

    const thisIndex = db.prints.indexOf(print);
    const prevPrintUrl = `/print/${db.prints[wrap(0, db.prints.length - 1, thisIndex - 1)].id}`;
    const nextPrintUrl = `/print/${db.prints[wrap(0, db.prints.length - 1, thisIndex + 1)].id}`;

    return <CommonPageLayout activeMenu="shop">


      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container>

          <div style={{ marginBottom: "2em" }}>
            <Breadcrumb size='large'>
              <Breadcrumb.Section link to="/shop"><Icon name="cart" />Shop</Breadcrumb.Section>
              <Breadcrumb.Divider icon='right chevron' />
              <Breadcrumb.Section>{print.title}</Breadcrumb.Section>
            </Breadcrumb>
          </div>

          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>


                <div style={{ position: "relative" }}>

                  <Dimmer active={loadState == 0} inverted>
                    <Loader />
                  </Dimmer>

                  <a href={print.image}>

                    <ReactImageMagnify
                      alt={print.title}
                      hoverDelayInMs={100}
                      style={{ cursor: "zoom-in", boxShadow: "0 5px 10px 0 rgba(34,36,38,.35)" }}
                      enlargedImagePosition="over"
                      smallImage={({
                        src: loadState == 0 ? print.thumb : print.image,
                        isFluidWidth: true,
                        onLoad: () => this.setState({ loadState: loadState + 1 })
                      })}
                      largeImage={({
                        src: loadState == 0 ? print.thumb : print.image,
                        width: 1600,
                        height: 1199
                      })}
                    />

                    <Button icon size="tiny" style={{ top: 10, right: 20, position: "absolute" }}>
                      <Icon name="expand" />
                    </Button>
                  </a>

                </div>

                <div style={{ textAlign: "center", marginTop: 20 }}>

                  <Button as={Link} to={prevPrintUrl}>
                    <Icon name="arrow left" />
                    Prev
                    </Button>
                  <Button as={Link} to={nextPrintUrl}>
                    Next
                      <Icon name="arrow right" />
                  </Button>
                </div>


              </Grid.Column>
              <Grid.Column width={6}>

                <Segment>

                  <Header as="h1">
                    {print.title}

                  </Header>

                  <div>
                    <Label basic><Icon name="calendar" />{moment(print.dateCreated).calendar()}</Label>
                    <Label basic as={Link} to={`/map/${print.id}`}><Icon name="marker" /> View on Map</Label>
                    {print.featured ? <Label basic><Icon name="star" />Featured</Label> : null}
                  </div>

                  <Segment color='grey'
                    dangerouslySetInnerHTML={{ __html: print.description }} style={{ marginBottom: "2em" }}
                  >
                  </Segment>

                  <div>

                    <Dropdown fluid selection options={printers}
                      value={selectedPrinter}
                      onChange={this.handleSelectedPrinterChange}
                      style={{ marginBottom: "0.5em" }}
                    />

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
                      data-item-id={`${print.id}-${selectedPrintOption.id}-${selectedPrintSize.id}-${selectedPrinter}`}
                      data-item-name={print.title}
                      data-item-image={print.thumb}
                      data-item-description={`'${print.title}' printed on '${selectedPrintOption.name}' at size '${selectedPrintSize.widthInches}" x ${selectedPrintSize.heightInches}"' using '${printerText}'`}
                      data-item-url={`https://${window.location.hostname}/products/${print.id}.json`}
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


                {/* <Segment>
                  <PrintsMap
                    prints={this.props.allPrints}
                    initialPrintId={print.id}
                  />
                </Segment> */}

              </Grid.Column>


            </Grid.Row>
          </Grid>
        </Container>
      </Segment>

    </CommonPageLayout>


  }


  handleSelectedPrinterChange = (e: any, dropdown: any) => {

    const print = this.state.print as IPrint;
    const printer: Printer = dropdown.value;
    const option = print.printOptions[printer][0];
    const size = option.sizes[0];

    console.log("Selected printer changed", printer);

    this.setState({
      selectedPrinter: printer,
      selectedPrintOption: option,
      selectedPrintSize: size
    })
  }

  handleSelectedPrintOptionChange = (e: any, dropdown: any) => {

    const print = this.state.print as IPrint;
    const selectedPrinter = this.state.selectedPrinter as Printer;
    const option = print.printOptions[selectedPrinter].find(o => o.id == dropdown.value);
    if (option == null)
      return;

    console.log("Selected print option changed", option);

    const size = option.sizes[0];
    this.setState({
      selectedPrintOption: option,
      selectedPrintSize: size
    });
  }

  handleSelectedPrintSizeChange = (e: any, dropdown: any) => {

    const option = this.state.selectedPrintOption as IPrintOption;
    var size = option.sizes.find(o => o.id == dropdown.value);
    if (size == null)
      return;

    console.log("Selected print size changed", size);

    this.setState({
      selectedPrintSize: size
    })
  }


  updatePath() {
    const print = this.state.print as IPrint;
    const option = this.state.selectedPrintOption as IPrintOption;
    const size = this.state.selectedPrintSize as IPrintOptionSize;
    const printer = this.state.selectedPrinter as Printer;

    const path = `/print/${print.id}/${option.id}/${size.id}/${printer}`;

    if (this.props.history.location.pathname != path)
      this.props.history.push(path);
  }

}