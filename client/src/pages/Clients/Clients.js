import React, { Component } from "react";
import { Col, Row, Container } from "react-bootstrap";

import { AddClient, ClientsTable } from "./components";
import "./Clients.css";

export default class Home extends Component {
  render() {
    return (
      <Container fluid className="clients">
        <Row className="px-1 px-md-2 px-lg-3 px-xl-4">
          <Col md={6} xl={4}>
            <AddClient />
          </Col>
          <Col md={6} xl={8} className="mx-auto">
            <ClientsTable />
          </Col>
        </Row>
      </Container>
    );
  }
}
