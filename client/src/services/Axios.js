import Axios from "axios";

Axios.defaults.baseURL = "http://localhost:8000";

// DO NOT MODIFY!! This code returns the res.data in .then()
Axios.interceptors.response.use(function (response) {
  return response.data;
});

export default Axios;
