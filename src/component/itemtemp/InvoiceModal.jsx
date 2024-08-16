import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Button,
  Col,
  Modal,
  Row,
  Table as BootstrapTable,
} from "react-bootstrap";

function InvoiceModal({ show, onHide, invoiceDetails, items, currency }) {
  const generateInvoice = () => {
    const invoiceElement = document.querySelector("#invoiceCapture");

    // Use a scale of 1 for clearer text rendering
    const scale = 2;

    html2canvas(invoiceElement, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      pdf.save("invoice_challan.pdf");
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body>
        <div
          id="invoiceCapture"
          style={{
            fontSize: "8pt",
            maxWidth: "800px",
            fontFamily: "Arial, sans-serif",
            lineHeight: "1",
            backgroundColor: "#FFFFFF", // Set background to white for printing
            minHeight: items.length <= 11 ? "40vh" : "auto", // Fixed height for up to 11 items
          }}
        >
          <Row>
            <Col className="text-center">
              <h2 className="fw-bold" style={{ marginBottom: "0.5rem" }}>
                Invoice Challan
              </h2>
            </Col>
          </Row>
          <hr style={{ margin: "0.5rem 0" }} />
          <Row>
            <Col>
              <h5 style={{ marginBottom: "0.5rem" }}>Bill To:</h5>
              <p style={{ margin: 0 }}>
                {invoiceDetails.billTo} <br />
                {invoiceDetails.billToAddress} <br />
                {invoiceDetails.billToNumber}
              </p>
            </Col>
            <Col>
              <h5 style={{ marginBottom: "0.5rem" }}>Invoice Details:</h5>
              <p style={{ margin: 0 }}>
                Invoice Number: {invoiceDetails.invoiceNumber} <br />
                Date: {invoiceDetails.currentDate}
              </p>
            </Col>
          </Row>
          <hr style={{ margin: "0.5rem 0" }} />
          <h5 style={{ marginBottom: "0.5rem" }}>Invoice Items:</h5>
          <BootstrapTable striped bordered hover>
            <thead>
              <tr>
                <th>Sr/No.</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price/Rate</th>
                <th className="text-center">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {item.product === "Custom"
                      ? item.customProduct
                      : item.product}
                  </td>
                  <td>{item.quantity}</td>
                  <td>
                    {currency} {item.price}
                  </td>
                  <td className="text-center">
                    {currency} {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              {/* Add placeholders for spacing if fewer than 11 items */}
              {items.length < 11 &&
                Array.from({ length: 11 - items.length }).map((_, idx) => (
                  <tr key={`placeholder-${idx}`}>
                    <td colSpan="5" style={{ height: "2em" }}></td>
                  </tr>
                ))}
            </tbody>
          </BootstrapTable>
          <hr style={{ margin: "0.5rem 0" }} />
          <Row>
            <Col className="text-end">
              <h5 style={{ marginBottom: "0.5rem" }}>
                Grand Total: {currency} {invoiceDetails.grandTotal}
              </h5>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={generateInvoice}>
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default InvoiceModal;
