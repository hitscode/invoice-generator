import { Button, Modal, Table } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SalesDataModal = ({
  showSalesData,
  setShowSalesData,
  salesData = [],
  currency,
}) => {
  const handleClose = () => setShowSalesData(false);

  const generateSalesDataPDF = () => {
    const salesDataElement = document.querySelector("#salesDataCapture");

    html2canvas(salesDataElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("sales_data.pdf");
    });
  };

  return (
    <Modal show={showSalesData} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Today&apos;s Sales Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div id="salesDataCapture">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sr/No.</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price ({currency})</th>
                <th className="text-center">Amount ({currency})</th>
              </tr>
            </thead>
            <tbody>
              {salesData.length > 0 ? (
                salesData.map((item, index) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No sales data available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={generateSalesDataPDF}>
          Print Sales Data
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SalesDataModal;
