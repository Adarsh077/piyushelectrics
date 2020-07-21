import { DELETE_CLIENTS, ADD_CLIENTS, UPDATE_CLIENT } from "./ClientActions";

const AddClients = (state, action) => {
  const clients = [...state.clients, ...action.payload];
  return { ...state, clients };
};

const DeleteClients = (state, action) => {
  let clients = [...state.clients];
  const ids = action.payload;

  clients = clients.filter((client) => !ids.includes(client._id));
  return { ...state, clients };
};

const UpdateClient = (state, action) => {
  let clients = [...state.clients];
  const updatedClient = action.payload;
  const idx = clients.findIndex((client) => client._id === updatedClient._id);
  clients.splice(idx, 1, updatedClient);
  return { ...state, clients };
};

export default (state, action) => {
  switch (action.type) {
    case ADD_CLIENTS:
      return AddClients(state, action);

    case DELETE_CLIENTS:
      return DeleteClients(state, action);

    case UPDATE_CLIENT:
      return UpdateClient(state, action);

    default:
      return state;
  }
};
