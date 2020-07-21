import React, { useContext } from "react";
import {
  Form,
  FormControl,
  Badge,
  Button,
  OverlayTrigger,
  Tooltip,
  Col,
} from "react-bootstrap";
import Axios from "../../../../services/Axios";
import { ClientContext } from "../../../../context/ClientContext";

const SearchBadge = ({ children }) => {
  return (
    <h5 className="mr-2 mb-0">
      <Badge className="search-badge py-2 px-3 " variant="secondary">
        {children}
      </Badge>
    </h5>
  );
};

export default function ActionBar(props) {
  const { selectedClients, setSelectedClients } = props;
  const { deleteClients } = useContext(ClientContext);

  const handleDelete = () => {
    Axios.delete(`/client?ids=${selectedClients.join(",")}`)
      .then((res) => {
        if (res.ok) {
          deleteClients(selectedClients);
          setSelectedClients([]);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form>
        <Form.Row className="mb-3">
          <Col sm={2}>
            <Button
              variant="danger"
              onClick={handleDelete}
              disabled={selectedClients.length === 0}
            >
              Delete
              {selectedClients.length > 0 && `(${selectedClients.length})`}
            </Button>
          </Col>
          <Col sm={10} className="w-100 ">
            <div className="d-flex flex-row-reverse">
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    To search for multiple keyword, press enter after each
                    keyword.
                  </Tooltip>
                }
              >
                <FormControl className="search py-0" placeholder="Search" />
              </OverlayTrigger>
              <div className="d-flex">
                <SearchBadge>Adarsh</SearchBadge>
                <SearchBadge>Adarsh</SearchBadge>
                <SearchBadge>Adarsh</SearchBadge>
              </div>
            </div>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
