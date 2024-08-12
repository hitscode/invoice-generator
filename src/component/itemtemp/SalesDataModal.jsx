import React from "react";
import { Button, Modal, Table } from "react-bootstrap";

function SalesDataModal({ show, onHide, items, currency }) {
  // Generate sales data for the modal
  const generateSalesData = () => {
    const today = new Date().toISOString().split("T")[0];
    const salesData = items.filter((item) => item.date === today);

    // Aggregate sales data by product
    const aggregatedData = salesData.reduce((acc, item) => {
      const existing = acc.find((i) => i.product === item.product);
      if (existing) {
        existing.totalQuantity += item.quantity;
        existing.totalPrice += item.quantity * item.price;
      } else {
        acc.push({
          product: item.product,
          totalQuantity: item.quantity,
          totalPrice: item.quantity * item.price,
        });
      }
      return acc;
    }, []);

    return aggregatedData;
  };

  const salesData = generateSalesData();

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Today's Sales Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Quantity</th>
              <th>Total Price ({currency})</th>
            </tr>
          </thead>
          <tbody>
            {salesData.map((data, index) => (
              <tr key={index}>
                <td>{data.product}</td>
                <td>{data.totalQuantity}</td>
                <td>{data.totalPrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SalesDataModal;
