import axios from "axios";
import cookies from "react-cookies";

export const endpoints = {
  doctors: "/doctors",
  allDoctors: "/doctors/all",
  doctorByUser: (userId) => `/doctors/user/${userId}`,
  login: "/login",
  "current-user": "/secure/profile",
  users: "/users",

  doctorSchedules: "/doctor-schedules",
  doctorScheduleDetail: (id) => `/doctor-schedules/${id}`,
  doctorSchedulesByDoctor: (doctorId) => `/doctors/${doctorId}/schedules`,

  secureDoctorSchedules: "/secure/doctor-schedules",
  secureDoctorScheduleDetail: (id) => `/secure/doctor-schedules/${id}`,

  appointments: "/appointments",
  appointmentsByDoctor: (doctorId) => `/appointments/doctor/${doctorId}`,

  medicalRecords: "/medical-records",
  medicalRecordsByPatient: (patientId) =>
    `/medical-records/patient/${patientId}`,
  medicalRecordDetail: (id) => `/medical-records/${id}`,
  medicalRecordByAppointment: (appointmentId) =>
    `/medical-records/appointment/${appointmentId}`,
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
