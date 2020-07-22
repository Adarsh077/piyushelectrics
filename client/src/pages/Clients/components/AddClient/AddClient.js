import React, { Component } from "react";
import { Card, Form, Col, Button } from "react-bootstrap";

import Axios from "../../../../services/Axios";
import { Input } from "../../../../components";
import validateAddClient from "../../../../utils/validation/validateAddClient";

import { ClientContext } from "../../../../context/ClientContext";

const intialState = {
  name: "",
  area: "",
  room: "",
  wing: "",
  work: "",
  date: "",
  mobile: "",
  building: "",
  errors: {},
};

export default class AddCient extends Component {
  static contextType = ClientContext;

  constructor() {
    super();
    this.state = intialState;
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAddClient(this.state, this.context.clients);
    if (errors) {
      return this.setState({ errors });
    }

    const {
      work: title,
      date,
      area,
      room,
      wing,
      building,
      ...rest
    } = this.state;

    const address = { room, wing, building, area };
    const work = { title, date };

    const body = {
      ...rest,
      work,
      address,
      date,
    };

    Axios.post("/client", body)
      .then((res) => {
        this.context.addClients(res);
        this.setState(intialState);
      })
      .catch((err) => console.log(err) || alert("An Error occurred"));
  };

  render() {
    const { name, mobile, area, room, wing, work, building, date } = this.state;
    const { errors } = this.state;

    return (
      <Card>
        <Card.Body>
          <h4 className="text-center">Add Client</h4>
          <hr />
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col sm={12} md={6}>
                <Input
                  type="text"
                  name="name"
                  label="Name"
                  value={name}
                  err={errors.name}
                  placeholder="Jhon Doe"
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={12} md={6}>
                <Input
                  type="number"
                  name="mobile"
                  label="Mobile"
                  value={mobile}
                  err={errors.mobile}
                  placeholder="9824711278"
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={12} md={6}>
                <Input
                  type="text"
                  name="wing"
                  label="Wing"
                  value={wing}
                  err={errors.wing}
                  placeholder="B Wing"
                  onChange={this.handleChange}
                  datalist={this.context.wingList}
                />
              </Col>
              <Col sm={12} md={6}>
                <Input
                  type="text"
                  name="room"
                  label="Room"
                  value={room}
                  err={errors.room}
                  placeholder="103"
                  onChange={this.handleChange}
                />
              </Col>
              <Col sm={12} md={6}>
                <Input
                  type="text"
                  name="building"
                  label="Building"
                  value={building}
                  err={errors.building}
                  onChange={this.handleChange}
                  placeholder="Agarwal Lifestyle"
                  datalist={this.context.buildingList}
                />
              </Col>
              <Col sm={12} md={6}>
                <Input
                  type="text"
                  name="area"
                  label="Area"
                  value={area}
                  err={errors.area}
                  placeholder="Global City"
                  onChange={this.handleChange}
                  datalist={this.context.areaList}
                />
              </Col>
              <Col sm={12} md={6}>
                <Input
                  type="text"
                  name="work"
                  label="Work"
                  value={work}
                  err={errors.work}
                  placeholder="AC Fitting"
                  onChange={this.handleChange}
                  datalist={this.context.workList}
                />
              </Col>
              <Col sm={12} md={6}>
                <Input
                  type="date"
                  name="date"
                  label="Date"
                  value={date}
                  err={errors.date}
                  onChange={this.handleChange}
                />
              </Col>
              <Button type="submit" block variant="outline-primary">
                Add Client
              </Button>
            </Form.Row>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}
