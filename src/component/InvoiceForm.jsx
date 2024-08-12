import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import InvoiceItems from "./itemtemp/InvoiceItems";
import InvoiceModal from "./itemtemp/InvoiceModal";
import SalesDataModal from "./itemtemp/SalesDataModal"; // Import the new component

const areas = [
  "Tantithaiya",
  "Vareli",
  "Chalthan",
  "Palsana",
  "Kadodara",
  "Jolva",
];

const customers = {
  Tantithaiya: [
    { name: "Hari Super", phone: "9898989898" },
    { name: "Raj", phone: "8786578678" },
    { name: "Laxmi Super", phone: "6878797789" },
    { name: "Asha Super", phone: "9797799908" },
    { name: "Devnarayan", phone: "9657898769" },
    { name: "Hitesh", phone: "9999999999" },
  ],
  Vareli: [
    { name: "Hari Super", phone: "9898989898" },
    { name: "Raj", phone: "8786578678" },
    { name: "Laxmi Super", phone: "6878797789" },
    { name: "Asha Super", phone: "9797799908" },
    { name: "Devnarayan", phone: "9657898769" },
    { name: "Hitesh", phone: "9999999999" },
  ],
  Chalthan: [
    { name: "Hari Super", phone: "9898989898" },
    { name: "Raj", phone: "8786578678" },
    { name: "Laxmi Super", phone: "6878797789" },
    { name: "Asha Super", phone: "9797799908" },
    { name: "Devnarayan", phone: "9657898769" },
    { name: "Hitesh", phone: "9999999999" },
  ],
  Palsana: [
    { name: "Hari Super", phone: "9898989898" },
    { name: "Raj", phone: "8786578678" },
    { name: "Laxmi Super", phone: "6878797789" },
    { name: "Asha Super", phone: "9797799908" },
    { name: "Devnarayan", phone: "9657898769" },
    { name: "Hitesh", phone: "9999999999" },
  ],
  Kadodara: [
    { name: "Hari Super", phone: "9898989898" },
    { name: "Raj", phone: "8786578678" },
    { name: "Laxmi Super", phone: "6878797789" },
    { name: "Asha Super", phone: "9797799908" },
    { name: "Devnarayan", phone: "9657898769" },
    { name: "Hitesh", phone: "9999999999" },
  ],
  Jolva: [
    { name: "Hari Super", phone: "9898989898" },
    { name: "Raj", phone: "8786578678" },
    { name: "Laxmi Super", phone: "6878797789" },
    { name: "Asha Super", phone: "9797799908" },
    { name: "Devnarayan", phone: "9657898769" },
    { name: "Hitesh", phone: "9999999999" },
  ],
};

function InvoiceForm() {
  const [showModal, setShowModal] = useState(false);
  const [showSalesData, setShowSalesData] = useState(false); // New state for sales data
  const [area, setArea] = useState("");
  const [customer, setCustomer] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(
    Math.floor(100000 + Math.random() * 900000).toString()
  );
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [items, setItems] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [billToAddress, setBillToAddress] = useState("");
  const [billToNumber, setBillToNumber] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    calculateGrandTotal();
  }, [items]);

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      product: "",
      quantity: 1,
      price: 0.0,
      date: new Date().toISOString().split("T")[0], // Set the current date
    };
    setItems([...items, newItem]);
  };

  const handleProductChange = (e, id) => {
    const { name, value } = e.target;
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setItems(updatedItems);
  };

  const handleRemoveItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const calculateGrandTotal = () => {
    const total = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    setGrandTotal(total.toFixed(2));
  };

  const handleAreaChange = (e) => {
    setArea(e.target.value);
    setCustomer("");
  };

  const handleCustomerChange = (e) => {
    const selectedCustomer = customers[area].find(
      (customer) => customer.name === e.target.value
    );
    setCustomer(selectedCustomer.name);
    setBillToNumber(selectedCustomer.phone);
    setBillToAddress(area); // Set the address to the selected area
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      <Card className="m-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="invoiceNumber">
                  <Form.Label>Invoice Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter invoice number"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="invoiceDate">
                  <Form.Label>Invoice Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="area">
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                    as="select"
                    value={area}
                    onChange={handleAreaChange}
                  >
                    <option>Select Area</option>
                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="customer">
                  <Form.Label>Customer</Form.Label>
                  <Form.Control
                    as="select"
                    value={customer}
                    onChange={handleCustomerChange}
                    disabled={!area}
                  >
                    <option>Select Customer</option>
                    {area &&
                      customers[area].map((customer) => (
                        <option key={customer.name} value={customer.name}>
                          {customer.name}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group controlId="billToAddress">
                  <Form.Label>Bill To Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    value={billToAddress}
                    onChange={(e) => setBillToAddress(e.target.value)}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="billToNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={billToNumber}
                    onChange={(e) => setBillToNumber(e.target.value)}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <InvoiceItems
                  items={items}
                  handleProductChange={handleProductChange}
                  handleRemoveItem={handleRemoveItem}
                  currency="₹"
                />
                <Button variant="outline-primary" onClick={handleAddItem}>
                  Add Item
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="notes">
                  <Form.Label>Firm's Bank Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={`A/c Holder's Name : Nilkanth Trader\nBank Name : Akhand Anand\nA/c No : 1004201000735\nBranch & IFSC Code : Kadodara & HDFC0CAACOB`}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <h5>Grand Total: ₹ {grandTotal}</h5>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              Preview Invoice
            </Button>
            <Button
              variant="info"
              className="mt-3 ms-2"
              onClick={() => setShowSalesData(true)}
            >
              View Today's Sales Data
            </Button>
          </Form>
          <InvoiceModal
            show={showModal}
            onHide={() => setShowModal(false)}
            invoiceDetails={{
              billTo: customer,
              billToAddress,
              billToNumber,
              invoiceNumber,
              currentDate: new Date(invoiceDate).toLocaleDateString(),
              grandTotal,
              notes: `A/c Holder's Name : Nilkanth Trader\nBank Name : Akhand Anand\nA/c No : 1004201000735\nBranch & IFSC Code : Kadodara & HDFC0CAACOB`,
            }}
            items={items}
            currency="₹"
          />
          <SalesDataModal
            show={showSalesData}
            onHide={() => setShowSalesData(false)}
            items={items}
            currency="₹"
          />
        </Card.Body>
      </Card>
    </>
  );
}

export default InvoiceForm;
