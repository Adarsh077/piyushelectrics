/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { EditForm, Work } from "./components";

import { ClientContext } from "../../context/ClientContext";

const SingleClient = (props) => {
  const context = useContext(ClientContext);
  const [currentClient, setCurrentClient] = useState({});

  useEffect(() => {
    if (context.clients.length === 0) return;
    const id = props.match.params.id;
    const client = context.clients.find((client) => client._id === id);
    if (!client) props.history.push("/");
    setCurrentClient(client);
  }, [context.clients]);

  return (
    <div className="px-1 px-md-3 px-lg-4 px-xl-5">
      <Row>
        <Col sm={12} md={6} xl={4} className="ml-auto">
          <EditForm currentClient={currentClient} />
        </Col>
        <Col sm={12} md={6} xl={6} className="mr-auto">
          <Work currentClient={currentClient} />
        </Col>
      </Row>
    </div>
  );
};

export default SingleClient;
