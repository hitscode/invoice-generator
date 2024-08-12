import { Container } from "react-bootstrap";
import InvoiceForm from "./component/InvoiceForm";

const App = () => {
  return (
    <Container>
      <h1>Invoice Generator</h1>
      <InvoiceForm />
    </Container>
  );
};

export default App;
