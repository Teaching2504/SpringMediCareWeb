import axios from "axios";
import cookies from "react-cookies";

export const endpoints = {
  doctors: "/doctors",
  login: "/login",
  "current-user": "/secure/profile",
  users: "/users",
};

export const authApis = () => {
  return axios.create({
    baseURL: "http://localhost:8080/SpringMediCareApp/api/",
    headers: {
      Authorization: `Bearer ${cookies.load("token")}`,
    },
  });
};

export default axios.create({
  baseURL: "http://localhost:8080/SpringMediCareApp/api/",
});
