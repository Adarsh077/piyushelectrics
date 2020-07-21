import Axios from "axios";

Axios.defaults.baseURL = "https://piyushelectrics.herokuapp.com";

// DO NOT MODIFY!! This code returns the res.data in .then()
Axios.interceptors.response.use(function (response) {
  return response.data;
});

export default Axios;
