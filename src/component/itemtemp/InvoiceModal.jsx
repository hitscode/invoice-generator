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

    // Adjust scale for better rendering
    const scale = 1.5;

    html2canvas(invoiceElement, { scale: scale }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a5", // Set format to A5
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      // const pdfHeight = pdf.internal.pageSize.getHeight();

      const marginX = 10; // Left and right margin
      const marginY = 10; // Top and bottom margin

      const contentWidth = pdfWidth - marginX * 2;
      const contentHeight = (canvas.height * contentWidth) / canvas.width;

      // Draw border around the content area
      pdf.setLineWidth(1);
      pdf.rect(marginX, marginY, contentWidth, contentHeight, "S");

      // Add the image inside the content area
      pdf.addImage(
        imgData,
        "PNG",
        marginX, // X position inside border
        marginY, // Y position inside border
        contentWidth, // Width of image inside border
        contentHeight // Height of image inside border
      );

      pdf.save("invoice_challan.pdf");
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body>
        <div
          id="invoiceCapture"
          style={{
            fontSize: "7pt", // Smaller font size for A5
            maxWidth: "560px", // Adjusted width for A5
            fontFamily: "Arial, sans-serif",
            lineHeight: "1.2",
            backgroundColor: "#FFFFFF",
            minHeight: items.length <= 0 ? "30vh" : "auto", // Adjust height for A5
            overflow: "hidden",
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
              {/* Add placeholders for spacing if fewer than 10 items */}
              {items.length < 10 &&
                Array.from({ length: 10 - items.length }).map((_, idx) => (
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
