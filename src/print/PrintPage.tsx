import * as React from "react";
import { IPrint, IPrintOptionSize, IPrintOption, IDB, Printer } from "../lib/types";
import {
  Button,
  Dropdown,
  Segment,
  Container,
  Header,
  Grid,
  Icon,
  Breadcrumb,
  Label,
  Dimmer,
  Loader,
  Visibility,
} from "semantic-ui-react";
import moment from "moment";
import { getPrintOptionOrDefault, getPrintSizeOrDefault, getPrint } from "../lib/db";
import { CommonPageLayout } from "../components/CommonPageLayout";
import { match, useLocation, useParams, useHistory } from "react-router";
import { Link } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import { wrap } from "normalize-range";
import { PurchaseModal } from "../components/PurchaseModal";
import { startPreloading } from "../routes";
import { useDb } from "../hooks/useDb";
import { LoadingPage } from "../loading/LoadingPage";
import { PrintRow } from "./PrintRow";
import { Vertical, Responsive, Stretch, Content, VerticalSpacer } from "gls/lib";
import { HeaderMenu } from "../components/HeaderMenu";
import { PageFooter } from "../components/PageFooter";
import { PrintsMap } from "../map/PrintsMap";
import { useScrollToTopOnEnter } from "../hooks/useScrollToTopOnEnter";

interface LocationState {
  option?: string;
  size?: string;
  printer?: Printer;
  id: string;
}

interface IState {
  print?: IPrint;
  selectedPrinter?: Printer;
  selectedPrintOption?: IPrintOption;
  selectedPrintSize?: IPrintOptionSize;
  purchaseModalOpen?: boolean;
  menuVisible?: boolean;
}

type PrinterDropdownOption = { text: string; value: Printer };
type PrinterDropdownOptions = PrinterDropdownOption[];

const printers: PrinterDropdownOptions = [
  { text: "🌎 Global Printer", value: "printful" },
  { text: "🐨 Australian Printer", value: "fitzgeralds" },
];

export default function PrintPage() {
  const params = useParams<LocationState>();
  const [db] = useDb();
  const location = useLocation();
  const history = useHistory();
  const [state, setState] = React.useState<IState>({});
  useScrollToTopOnEnter();

  const {
    purchaseModalOpen,
    selectedPrintOption,
    selectedPrinter,
    print,
    selectedPrintSize,
    menuVisible,
  } = state;

  React.useEffect(() => {
    if (!db) return;

    const print = getPrint(db, params.id);
    const printer = (params.printer || "fitzgeralds") as Printer;
    const option = getPrintOptionOrDefault(print, printer, params.option);
    const size = getPrintSizeOrDefault(option, params.size);

    setState({
      print,
      selectedPrinter: printer,
      selectedPrintOption: option,
      selectedPrintSize: size,
    });
  }, [db, params]);

  React.useEffect(() => {
    if (!print || !selectedPrintOption || !selectedPrintSize || !selectedPrinter) return;

    const currPath = location.pathname;
    //const newPath = `/print/${print.id}/${option.id}/${size.id}/${printer}`;
    const newPath = `/print/${print.id}`;

    if (currPath != newPath) {
      console.log("Pushing path onto the history", { currPath, newPath });
      history.push(newPath);
    }
  }, [state]);

  // const componentWillReceiveProps = (nextProps: IProps) => {
  //   setState(getInitialState(nextProps));
  // };

  // const componentDidUpdate = (prevProps: IProps, prevState: IState) => {
  //   // console.log("DID UPDATE", { prev: prevState, now: this.state })

  //   // Update the path in the browser bar every time we render
  //   updatePath();
  // };

  const handleSelectedPrinterChange = (e: any, dropdown: any) => {
    const print = state.print as IPrint;
    const printer: Printer = dropdown.value;
    const option = print.printOptions[printer][0];
    const size = option.sizes[0];

    console.log("Selected printer changed", printer);

    setState({
      ...state,
      selectedPrinter: printer,
      selectedPrintOption: option,
      selectedPrintSize: size,
    });
  };

  const handleSelectedPrintOptionChange = (e: any, dropdown: any) => {
    const print = state.print as IPrint;
    const selectedPrinter = state.selectedPrinter as Printer;
    const option = print.printOptions[selectedPrinter].find(o => o.id == dropdown.value);
    if (option == null) return;

    console.log("Selected print option changed", option);

    const size = option.sizes[0];
    setState({
      ...state,
      selectedPrintOption: option,
      selectedPrintSize: size,
    });
  };

  const handleSelectedPrintSizeChange = (e: any, dropdown: any) => {
    const option = state.selectedPrintOption as IPrintOption;
    var size = option.sizes.find(o => o.id == dropdown.value);
    if (size == null) return;

    console.log("Selected print size changed", size);

    setState({
      ...state,
      selectedPrintSize: size,
    });
  };

  if (!db || !print || !selectedPrintOption || !selectedPrinter || !selectedPrintSize)
    return <LoadingPage />;

  const printerText = (printers.find(p => p.value == selectedPrinter) as PrinterDropdownOption)
    .text;

  const selectedPrintOptions = print.printOptions[selectedPrinter].map(o => ({
    text: o.name,
    value: o.id,
  }));

  const selectedPrintSizes = selectedPrintOption.sizes.map(o => ({
    text: `${o.widthInches}" x ${o.heightInches}"`,
    value: o.id,
  }));

  const thisIndex = db.prints.indexOf(print);
  const prevPrintUrl = `/print/${db.prints[wrap(0, db.prints.length - 1, thisIndex - 1)].id}`;
  const nextPrintUrl = `/print/${db.prints[wrap(0, db.prints.length - 1, thisIndex + 1)].id}`;

  return (
    <div>
      <Vertical horizontalAlign="center" spacing={0}>
        <div
          style={{
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
          }}
        >
          {menuVisible && (
            <HeaderMenu
              // showLogo={false}
              // menuProps={{
              //   inverted: true,
              //   pointing: true,
              //   secondary: true,
              //   style: { border: "none" },
              //   size: "huge",
              // }}
              menuProps={{ fixed: "top", size: "huge" }}
              activeMenu="shop"
            />
          )}
        </div>
        <Visibility
          style={{ width: "100%" }}
          onTopPassed={() => setState({ ...state, menuVisible: true })}
          onTopVisible={() => setState({ ...state, menuVisible: false })}
          once={false}
        >
          <PrintRow print={print} />
        </Visibility>
        <VerticalSpacer space={20} />
        <Header style={{ margin: 0 }} as="h1">
          {print.title}
        </Header>
        <VerticalSpacer space={20} />
        <Responsive
          vertical={{ horizontalAlign: "center" }}
          breakpoint={800}
          style={{ width: "100%", maxWidth: 900, padding: 10 }}
        >
          <Stretch style={{ width: "100%" }}>
            <Vertical spacing={5} style={{ width: "100%" }}>
              {print.description && (
                <Segment
                  dangerouslySetInnerHTML={{ __html: print.description }}
                  style={{ marginBottom: "2em" }}
                />
              )}
              <PrintsMap hideSearch height={300} prints={db.prints} initialPrintId={print.id} />
            </Vertical>
          </Stretch>
          <div>
            <Segment style={{ maxWidth: 400, width: "100%", margin: 0 }}>
              <div>
                <Label basic>
                  <Icon name="calendar" />
                  {moment(print.dateCreated).calendar()}
                </Label>
                <Label basic as={Link} to={`/map/${print.id}`}>
                  <Icon name="marker" /> View on Map
                </Label>
                {print.featured ? (
                  <Label basic>
                    <Icon name="star" />
                    Featured
                  </Label>
                ) : null}
              </div>
              <VerticalSpacer space={20} />
              <div>
                <Dropdown
                  fluid
                  selection
                  options={printers}
                  value={selectedPrinter}
                  onChange={handleSelectedPrinterChange}
                  style={{ marginBottom: "0.5em" }}
                />

                <Dropdown
                  fluid
                  selection
                  options={selectedPrintOptions}
                  value={selectedPrintOption.id}
                  onChange={handleSelectedPrintOptionChange}
                  style={{ marginBottom: "0.5em" }}
                />

                <Dropdown
                  fluid
                  selection
                  options={selectedPrintSizes}
                  value={selectedPrintSize.id}
                  onChange={handleSelectedPrintSizeChange}
                  style={{ marginBottom: "1em" }}
                />
              </div>

              <div>
                <Button
                  primary
                  className="snipcart-add-item"
                  data-item-id={`${print.id}-${selectedPrintOption.id}-${selectedPrintSize.id}-${selectedPrinter}`}
                  data-item-name={print.title}
                  data-item-image={print.thumb}
                  data-item-description={`'${print.title}' printed on '${selectedPrintOption.name}' at size '${selectedPrintSize.widthInches}" x ${selectedPrintSize.heightInches}"' using '${printerText}'`}
                  data-item-url={`https://${window.location.hostname}/products/${print.id}.json`}
                  data-item-weight={selectedPrintSize.weight}
                  data-item-price={selectedPrintSize.priceAUD}
                  data-item-custom1-name="Note to Above Under"
                  data-item-custom1-type="textarea"
                  onClick={() => setState({ ...state, purchaseModalOpen: true })}
                >
                  Buy it for $ {selectedPrintSize.priceAUD} AUD
                  <Icon name="chevron right" />
                </Button>
              </div>
            </Segment>
          </div>
        </Responsive>
        <VerticalSpacer space={20} />
      </Vertical>
      {purchaseModalOpen && print && selectedPrintSize && selectedPrintOption && (
        <PurchaseModal
          onClose={() => setState({ ...state, purchaseModalOpen: false })}
          print={print}
          option={selectedPrintOption}
          size={selectedPrintSize}
        />
      )}
      <PageFooter />
    </div>
  );
}

startPreloading();
