import { Button, Modal } from "react-bootstrap";

const SalesDataModal = ({ showSalesData, setShowSalesData, salesCount }) => {
  const handleClose = () => setShowSalesData(false);

  return (
    <Modal show={showSalesData} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Sales Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Total Bills/Invoices Created Today: {salesCount}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SalesDataModal;
