/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Table, Form } from "react-bootstrap";

import ActionBar from "./ActionBar";

import { ClientContext } from "../../../../context/ClientContext";
import { useState } from "react";

const ClientsTable = (props) => {
  const { clients } = useContext(ClientContext);
  const [selectedClients, setSelectedClients] = useState([]);

  const goto = (id) => () => props.history.push(`/client/${id}`);

  const toggleSelectClient = (id) => () => {
    const idx = selectedClients.findIndex((clientid) => clientid === id);
    const newSelectedClients = [...selectedClients];
    if (idx !== -1) newSelectedClients.splice(idx, 1);
    else newSelectedClients.push(id);
    setSelectedClients(newSelectedClients);
  };

  const toggleSelectAll = () => {
    const allSelected = clients.length === selectedClients.length;
    if (allSelected) return setSelectedClients([]);
    setSelectedClients(clients.map((client) => client._id));
  };

  const handleRowClick = (id) =>
    selectedClients.length > 0 ? toggleSelectClient(id) : goto(id);

  return (
    <div>
      <ActionBar
        selectedClients={selectedClients}
        setSelectedClients={setSelectedClients}
      />
      <div className="scrollbar-hidden" style={{ height: "83vh" }}>
        <Table hover responsive>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={
                    clients.length === selectedClients.length &&
                    clients.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Date</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const { room, wing, building, area } = client.address;
              const address = `${wing}/${room}, ${building}, ${area}`;
              const date = new Date(client.date).toLocaleString();

              const isSelected = selectedClients.findIndex(
                (id) => id === client._id
              );

              return (
                <tr key={uuid()}>
                  <td onClick={toggleSelectClient(client._id)}>
                    <Form.Check
                      type="checkbox"
                      defaultChecked={isSelected !== -1}
                    />
                  </td>
                  <td onClick={handleRowClick(client._id)}>{client.name}</td>
                  <td onClick={handleRowClick(client._id)}>{client.mobile}</td>
                  <td onClick={handleRowClick(client._id)}>{date}</td>
                  <td onClick={handleRowClick(client._id)}>{address}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default withRouter(ClientsTable);
