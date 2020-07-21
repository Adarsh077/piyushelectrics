/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { withRouter } from "react-router-dom";
import { Table, Button } from "react-bootstrap";

import AddWork from "../AddWork/AddWork";
import "./Work.css";

import { ClientContext } from "../../../../context/ClientContext";
import Axios from "../../../../services/Axios";

const Work = (props) => {
  const context = useContext(ClientContext);
  const [currentClient, setCurrentClient] = useState({ work: [] });

  useEffect(() => {
    if (context.clients.length === 0) return;
    const id = props.match.params.id;
    const client = context.clients.find((client) => client._id === id);
    if (!client) props.history.push("/");
    setCurrentClient({ ...client, ...client.address });
  }, [context.clients]);

  const deleteWork = (idx) => () => {
    const work = [...currentClient.work];
    work.splice(idx, 1);
    Axios.put(`/client/${currentClient._id}`, { work })
      .then(context.updateClient)
      .catch((err) => console.log(err));
  };

  return (
    <div className="work">
      <AddWork />
      <hr />
      <Table hover responsive>
        <thead>
          <tr>
            <th>Work</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentClient.work.map((work, idx) => (
            <tr key={uuid()}>
              <td>{work.title}</td>
              <td>{new Date(work.date).toLocaleDateString()}</td>
              <td className="delete">
                <Button
                  onClick={deleteWork(idx)}
                  variant="outline-danger"
                  size="sm"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default withRouter(Work);
