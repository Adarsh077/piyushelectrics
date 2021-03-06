/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./ClientReducer";

import { DELETE_CLIENTS, ADD_CLIENTS, UPDATE_CLIENT } from "./ClientActions";
import Axios from "../services/Axios";

const initalState = {
  clients: [],
  workList: [
    "A.C Fitting",
    "A.C Point",
    "Aldrop Fitting",
    "Bathroom Accessories Fitting",
    "Bed Fitting",
    "Bed Remove",
    "Box Mirror Fitting",
    "Cable Extension",
    "Cooler Repairing",
    "Core Cutting",
    "Curtain Fitting",
    "Curtain Remove",
    "Door Bell Fitting",
    "Door Eye Fitting",
    "Door Handle Fitting",
    "Door Stopper Fitting",
    "Down Light Fitting",
    "Drawer Channel Fitting",
    "Drilling",
    "ELCB Fitting",
    "ELCB Replace",
    "Electric",
    "Electric Board Fitting",
    "Electric Board Repairing",
    "Electric Point",
    "Electricity Problem",
    "Exhaust Fan Fitting",
    "Exhaust Fan Repairing",
    "Fan Capacitors Replace",
    "Fan Fitting",
    "Fan Problem",
    "Fan Remove",
    "Fan Repairing",
    "Fan Winding",
    "Flush Fitting",
    "Flush Repairing",
    "Fridge Point",
    "Gas Pipe Fitting",
    "Geyser Fitting",
    "Geyser MCB Fitting",
    "Geyser MCB Repairing",
    "Geyser Pipe Fitting",
    "Geyser Point",
    "Geyser Repairing",
    "Glass Corner Fitting",
    "Glass Self Fitting",
    "Hanger Fitting",
    "Hardware",
    "Inverter Fitting",
    "Inverter Repairing",
    "Jet Spray Fitting",
    "Jet Spray Pipe Fitting",
    "Jet Spray Replace",
    "Jula Fitting",
    "Kitchen Door Repairing",
    "Kitchen Trolley Repairing",
    "LED Panel Fitting",
    "Light Fitting",
    "Light Holder Fitting",
    "Light Holder Replace",
    "Light Problem",
    "Lock Fitting",
    "Lock Problem",
    "Lock Replace",
    "Mandir Fitting",
    "MCB Fitting",
    "MCB Replace",
    "Mirror Fitting",
    "Mosquito Net Fitting",
    "Pigeon Net Fitting",
    "Plumbing",
    "Pressure Pump Fitting",
    "Regulator Fitting",
    "Rope Patti Fitting",
    "Setup Box Fitting",
    "Show Case Fitting",
    "Sliding Repairing",
    "Soap Dish Fitting",
    "Socket Fitting",
    "Speaker Fitting",
    "Spot Light Fitting",
    "Switch Fitting",
    "Switch Replace",
    "T.V Dish Fitting",
    "T.V Fitting",
    "T.V Point",
    "Tank Fitting",
    "Tank Problem",
    "Tap Fitting",
    "Tap Problem",
    "Toilet Seat Fitting",
    "Towel Rod Fitting",
    "Tower Bolt Fitting",
    "Tube Fitting",
    "Value Fitting",
    "Washing Machine Fitting",
    "Washing Machine Pipe Fitting",
    "Washing Machine Tap Fitting",
    "Wiring",
    "Zoomer Fitting",
  ],
  wingList: [
    "A-Wing",
    "B-Wing",
    "C-Wing",
    "D-Wing",
    "E-Wing",
    "F-Wing",
    "G-Wing",
    "H-Wing",
    "I-Wing",
    "J-Wing",
    "K-Wing",
    "L-Wing",
    "M-Wing",
    "O-Wing",
    "P-Wing",
    "Building.No.01",
    "Building.No.02",
    "Building.No.03",
    "Building.No.04",
    "Building.No.05",
    "Building.No.06",
    "Building.No.07",
    "Building.No.08",
    "Building.No.09",
    "Building.No.10",
    "Building.No.11",
    "Building.No.12",
    "Building.No.13",
    "Building.No.14",
    "Building.No.15",
    "Building.No.16",
    "Building.No.17",
    "Building.No.18",
    "Building.No.19",
    "Building.No.20",
  ],
  buildingList: [
    "Agarwal Lifestyle A",
    "Agarwal Lifestyle B",
    "Agarwal Lifestyle C",
    "Agarwal Solitaire",
    "Agarwal Paramount",
    "Bhoomi Acropolis",
    "Bhavani View",
    "Blu Pearl",
    "Cosmos Regency",
    "M-Avenue",
    "J-Avenue",
    "H-Avenue",
    "G-Avenue",
    "I-Avenue",
    "K-Avenue",
    "L-Avenue",
    "D-Avenue",
    "Poonam Avenue",
    "Poonam ParkView",
    "Pooman Heights",
    "Poonam Imperial",
    "Bachraj Landmark",
    "Bachraj Residency",
    "Bachraj Paradise",
    "Bachraj LifeSpace",
    "Sumit Greendale",
    "Sumit Greendale NX",
    "Shree Shashwat",
    "Star Heights",
    "Shanti Homes",
    "Siddhi Homes",
    "Evershine Homes",
    "Evershine Avenue A3",
    "Evershine Avenue A6",
    "Ekta Parksville Central",
    "Ekta Parksville Lincoln",
    "Ekta Parksville Sentosa",
    "Ekta Parksville Regent",
    "Ekta Brooklyn Park",
    "Vinay Unique Gardens",
    "Vinay Unique Homes",
    "Vinay Unique Heights",
    "Vinay Unique Imperia",
    "Vinay Unique Corner",
    "Joyti Harmony",
    "Mandar Avenue",
    "Mandar Shlip",
    "Mahavir heights",
    "Casa Vista",
    "New Home Paradise",
    "Mathuresh Krupa",
    "Rachna Tower",
    "Datta Krishna Height",
  ],
  areaList: ["Global City", "Y. K Nagar", "HDIL Layout"],
};

// Client Context
export const ClientContext = createContext(initalState);

// Client Provider
export const ClientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initalState);

  // Fetch Clients
  useEffect(() => {
    if (state.clients.length === 0) {
      Axios.get("/client")
        .then(addClients)
        .catch((err) => console.log(err) || alert("An Error Occurred"));
    }
  }, []);

  // Actions
  function addClients(clients) {
    if (!Array.isArray(clients)) clients = [clients];

    dispatch({
      type: ADD_CLIENTS,
      payload: clients,
    });
  }

  function deleteClients(ids) {
    if (!Array.isArray(ids)) ids = [ids];

    dispatch({
      type: DELETE_CLIENTS,
      payload: ids,
    });
  }

  function updateClient(client) {
    dispatch({
      type: UPDATE_CLIENT,
      payload: client,
    });
  }

  const providerValue = {
    ...state,
    addClients,
    deleteClients,
    updateClient,
  };

  return (
    <ClientContext.Provider value={providerValue}>
      {children}
    </ClientContext.Provider>
  );
};
