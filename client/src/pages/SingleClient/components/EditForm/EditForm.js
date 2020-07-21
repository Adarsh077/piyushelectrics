/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Col, Card, Form, Button } from "react-bootstrap";

import { Input } from "../../../../components";
import validateAddClient from "../../../../utils/validation/validateAddClient";
import convertToYY_MM_DD from "../../../../utils/convertToYY_MM_DD";
import { ClientContext } from "../../../../context/ClientContext";
import Axios from "../../../../services/Axios";

const EditForm = (props) => {
  const context = useContext(ClientContext);
  const [currentClient, setCurrentClient] = useState({});
  const [errors, setErrors] = useState({});
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    if (context.clients.length === 0) return;
    const id = props.match.params.id;
    const client = context.clients.find((client) => client._id === id);
    if (!client) props.history.push("/");
    setCurrentClient({ ...client, ...client.address });
  }, [context.clients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentClient({ ...currentClient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAddClient(currentClient, { work: false });
    if (errors) setErrors(errors);
    else setErrors({});

    const body = {
      ...currentClient,
      address: {
        wing: currentClient.wing,
        room: currentClient.room,
        building: currentClient.building,
        area: currentClient.area,
      },
    };

    setDisableButton(true);

    Axios.put(`/client/${currentClient._id}`, body)
      .then((res) => {
        context.updateClient(res);
        setDisableButton(false);
      })
      .catch((err) => console.log(err) || alert("An Error Occurred."));
  };

  return (
    <Card>
      <Card.Body>
        <h4 className="text-center">Edit Client</h4>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Col sm={12}>
              <Input
                label="Name"
                type="text"
                name="name"
                placeholder="Jhone Doe"
                onChange={handleChange}
                value={currentClient.name || ""}
                err={errors.name}
              />
            </Col>
            <Col sm={12} md={6}>
              <Input
                label="Mobile"
                name="mobile"
                type="number"
                placeholder="9856744781"
                onChange={handleChange}
                value={currentClient.mobile || ""}
                err={errors.mobile}
              />
            </Col>
            <Col sm={12} md={6}>
              <Input
                label="Date"
                name="date"
                type="date"
                onChange={handleChange}
                value={
                  currentClient.date
                    ? convertToYY_MM_DD(currentClient.date)
                    : ""
                }
                err={errors.date}
              />
            </Col>
            <Col sm={12} md={6}>
              <Input
                label="Wing"
                name="wing"
                type="text"
                placeholder="B Wing"
                onChange={handleChange}
                value={currentClient.wing || ""}
                datalist={context.wingList}
                err={errors.wing}
              />
            </Col>
            <Col sm={12} md={6}>
              <Input
                type="text"
                name="room"
                label="Room"
                placeholder="103"
                onChange={handleChange}
                value={currentClient.room || ""}
                err={errors.room}
              />
            </Col>
            <Col sm={12} md={6}>
              <Input
                type="text"
                name="building"
                label="Building"
                placeholder="Agarwal Lifestyle"
                onChange={handleChange}
                datalist={context.buildingList}
                value={currentClient.building || ""}
                err={errors.building}
              />
            </Col>
            <Col sm={12} md={6}>
              <Input
                label="Area"
                name="area"
                type="text"
                placeholder="Global City"
                onChange={handleChange}
                datalist={context.areaList}
                value={currentClient.area || ""}
                err={errors.area}
              />
            </Col>
            <Col sm={12}>
              <Button
                type="submit"
                className="py-2"
                variant="outline-primary"
                block
                disabled={disableButton}
              >
                Save
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default withRouter(EditForm);
