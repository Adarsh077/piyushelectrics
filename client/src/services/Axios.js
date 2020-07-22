import Axios from "axios";

const developmentURL = "http://localhost:8000";
const productionURL = "https://piyushelectrics.herokuapp.com";

Axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? developmentURL : productionURL;

// DO NOT MODIFY!! This code returns the res.data in .then()
Axios.interceptors.response.use((response) => response.data);

export default Axios;
