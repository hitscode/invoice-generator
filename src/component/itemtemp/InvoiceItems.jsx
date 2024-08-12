import React from "react";
import { Button, Form, Table } from "react-bootstrap";

const defaultProducts = [
  "Rajshree R5",
  "Rajshree R10",
  "Rajshree R20",
  "Rajshree R40",
  "Kamla Pasand R5",
  "Versha R5",
  "Versha R10",
  "Shikhar R5",
  "Jivan R1",
  "Gold National",
  "Custom",
];

function InvoiceItems({
  items,
  handleProductChange,
  handleRemoveItem,
  currency,
}) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Sr/No.</th>
          <th>Product</th>
          <th style={{ width: "15%" }}>Quantity</th>
          <th style={{ width: "15%" }}>Price ({currency})</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <Form.Control
                as="select"
                name="product"
                value={item.product}
                onChange={(e) => handleProductChange(e, item.id)}
              >
                <option value="">Select Product</option>
                {defaultProducts.map((product) => (
                  <option key={product} value={product}>
                    {product}
                  </option>
                ))}
              </Form.Control>
              {item.product === "Custom" && (
                <Form.Control
                  type="text"
                  placeholder="Enter custom product name"
                  name="customProduct"
                  value={item.customProduct || ""}
                  onChange={(e) => handleProductChange(e, item.id)}
                  className="mt-2"
                />
              )}
            </td>
            <td>
              <Form.Control
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleProductChange(e, item.id)}
                style={{ height: "40%", width: "100%" }}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleProductChange(e, item.id)}
                style={{ height: "40%", width: "100%" }}
              />
            </td>
            <td>
              <Button
                variant="danger"
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default InvoiceItems;
