import axios from "axios";

axios.defaults.baseURL = "https://d7b6-202-28-123-199.ngrok-free.app/api";

const multipartForm = {
  headers: { "Content-Type": "multipart/form-data" },
};

const responseBody = (res) => res.data;

const req = {
  get: (url, options = {}) => axios.get(url, options).then(responseBody),
  post: (url, data) => axios.post(url, data).then(responseBody),
  onlypost: (url) => axios.post(url).then(responseBody),
  postForm: (url, data) =>
    axios.post(url, data, multipartForm).then(responseBody),
};

export default {
  imgCalDiabetes: async (img) => {
    var formData = new FormData();
    formData.append("fileImages", {
      uri: img,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    return req.postForm("/image", formData);
  },
  user: {
    newByName: (data) => req.post("/user/newUserByName", data),
    loginByPhone: (phone) => req.onlypost(`/user/loginByPhone?phone=${phone}`),
    register: (data) => req.post("/user/register", data),
  },
  hearing: {
    createHearing: (data) => req.post("/hearing/addHearingByUserId", data),
  },
  diabete: {
    hearingWithDiabeteList: (userId) =>
      req.get("/hearing/getAllByUserId?userId=" + userId),
  },
  fmht: {
    createFMHT: (data) => req.post("/FMHT/CreateFMHT", data),
    GetFMHTByUserId: (userId) =>
      req.get(`/FMHT/GetFMHTByUserId?userId=${userId}`),
  },
};
