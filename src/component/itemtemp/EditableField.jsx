import { Form } from "react-bootstrap";

export default function EditableField({ cellData, onItemizedItemEdit }) {
  return (
    <Form.Control
      type={cellData.type}
      placeholder={cellData.placeholder}
      name={cellData.name}
      value={cellData.value}
      onChange={(e) => onItemizedItemEdit(e, cellData.id)}
      className={cellData.className}
      min={cellData.min}
      step={cellData.step}
    />
  );
}
