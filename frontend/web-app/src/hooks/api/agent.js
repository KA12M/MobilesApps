import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;

const responseBody = (res) => res.data;

axios.interceptors.response.use(async (res) => {
  const pagination = res.headers["pagination"];
  if (pagination) {
    res.data = { data: res.data, pagination: JSON.parse(pagination) };
    return res;
  }
  return res;
});

const request = {
  get: (url, options = {}) => axios.get(url, options).then(responseBody),
  post: (url, data = {}) => axios.post(url, data).then(responseBody),
  put: (url, data = {}) => axios.put(url, data).then(responseBody),
  del: (url, options = {}) => axios.delete(url, options).then(responseBody),
};

export default {
  user: {
    list: (params) => request.get("/User/GetUsers", { params }),
    one: (userId) => request.get("/User/" + userId),
    newUser: (data) => request.post("/User/Register", data),
  },
  hearing: {
    list: (userId) => request.get("/Hearing/GetAllByUserId?userId=" + userId),
  },
};
