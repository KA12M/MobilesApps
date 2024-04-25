import axios from "axios";

// const pathServer = "http://10.103.0.16/ear-eye/api/";
export const pathImageServer =
  "https://tee.kru.ac.th/projects/ear-eye-project/assets/";

export const pathServer = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = pathServer;

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

export const Recheck = async (formData) =>
  await fetch(pathServer + "Diabetes/RecheckDiabete", {
    method: "POST",
    body: formData,
  });

// export const createeye = async (bodyData) =>
//   await fetch(pathServer + "Diabetes/CreateDiabete", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(bodyData),
//   });

export default {
  user: {
    list: (params) => request.get("/User/GetUsers", { params }),
    one: (userId) => request.get("/User/" + userId),
    newUser: (data) => request.post("/User/Register", data),
    login: (phone) => request.post(`/User/LoginByPhone?phone=${phone}`),
  },
  hearing: {
    list: (userId) => request.get("/Hearing/GetAllByUserId?userId=" + userId),
  },
  // eye: {
  //   delete: (id) => request.del("/Diabetes/RemoveDiabete?eyeId=" + id),
  // },
};
