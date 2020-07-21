/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";

import { Input } from "../../../../components";

import { ClientContext } from "../../../../context/ClientContext";
import Axios from "../../../../services/Axios";

const AddWork = (props) => {
  const context = useContext(ClientContext);
  const [currentClient, setCurrentClient] = useState({});
  const [work, setWork] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (context.clients.length === 0) return;
    const id = props.match.params.id;
    const client = context.clients.find((client) => client._id === id);
    if (!client) props.history.push("/");
    setCurrentClient({ ...client, ...client.address });
  }, [context.clients]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = {};
    if (!work) err.work = "Work is required";
    if (!date) err.date = "Date is required";

    if (Object.keys(err).length > 0) return setErrors(err);
    else setErrors({});

    const currentWork = [...currentClient.work];
    currentWork.push({ title: work, date });
    setDate("");
    setWork("");
    Axios.put(`/client/${currentClient._id}`, { work: currentWork })
      .then(context.updateClient)
      .catch((err) => console.log(err) || alert("An error occurred"));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col sm={12} md={5}>
          <Input
            type="text"
            value={work}
            onChange={(e) => setWork(e.target.value)}
            placeholder="Work"
            datalist={context.workList}
            err={errors.work}
          />
        </Col>
        <Col sm={12} md={5}>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            err={errors.date}
          />
        </Col>
        <Col sm={12} md={2}>
          <Button variant="outline-primary" block type="submit">
            Add
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default withRouter(AddWork);
