import axios from "axios";
//I recommend you use your ip address instead of using localhost
const Axios = axios.create({
  baseURL: "http://localhost:8080/",
});

export default Axios;
