import React from "react";
import { v4 as uuid } from "uuid";
import { Form } from "react-bootstrap";

const Input = (props) => {
  const { err, label, datalist, ...rest } = props;
  const datalistid = uuid();
  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...rest} list={datalistid} isInvalid={Boolean(err)} />
      {Boolean(err) && (
        <Form.Control.Feedback type="invalid">{err}</Form.Control.Feedback>
      )}
      {datalist && (
        <datalist id={datalistid}>
          {datalist.map((item) => (
            <option value={item} key={uuid()} />
          ))}
        </datalist>
      )}
    </Form.Group>
  );
};
export default Input;
