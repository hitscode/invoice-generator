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

    html2canvas(invoiceElement).then((canvas) => {
      const ImgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4", // A4 size
      });

      const imgProps = pdf.getImageProperties(ImgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(ImgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      while (heightLeft > 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(ImgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save("invoice.pdf");
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Body>
        <div id="invoiceCapture">
          <Row>
            <Col className="text-center">
              <h2 className="fw-bold">NILKANTH TRADERS</h2>
              <p>
                MAHEK RESIDENCY VARELI SURAT 394315 24-Gujarat <br />
                GST NO.: 24KHMPK5889Q1ZZ | PH. NO.: 8866272811, 9974454219 |
                EMAIL: nilkanthtraders82@gmail.com
              </p>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <h5>Bill To:</h5>
              <p>
                {invoiceDetails.billTo} <br />
                {invoiceDetails.billToAddress} <br />
                {invoiceDetails.billToNumber}
              </p>
            </Col>
            <Col>
              <h5>Invoice Details:</h5>
              <p>
                Invoice Number: {invoiceDetails.invoiceNumber} <br />
                Date: {invoiceDetails.currentDate}
              </p>
            </Col>
          </Row>
          <hr />
          <h5>Invoice Items:</h5>
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
                  <td>{item.product}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {currency} {item.price}
                  </td>
                  <td className="text-center">
                    {currency} {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </BootstrapTable>
          <hr />
          <Row>
            <Col className="text-end">
              <h5>
                Grand Total: {currency} {invoiceDetails.grandTotal}
              </h5>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Bank Details:</h5>
              <p>
                A/c Holder's Name : Nilkanth Traders <br />
                Bank Name : Akhand Anand <br />
                A/c No : 1004201000735 <br />
                Branch & IFSC Code : Kadodara & HDFC0CAACOB
              </p>
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
