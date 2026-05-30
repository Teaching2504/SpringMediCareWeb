import DoctorSchedule from "./screens/DoctorSchedule/DoctorSchedule";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home/Home";
import Doctor from "./screens/Doctor/Doctor";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import { useReducer } from "react";
import Specialty from "./screens/Specialty/Specialty";
import cookie from "react-cookies";
import { MyUserContext } from "./configs/Contexts";
import MyUserReducer from "./reducers/MyUserReducer";
import Booking from "./screens/Booking/Booking";
import MyAppointment from "./screens/MyAppointment/MyAppointment";
import AdminAppointment from "./screens/AdminAppointment/AdminAppointment";
import DoctorWorkSchedule from "./screens/DoctorWorkSchedule/DoctorWorkSchedule";
import DoctorAppointment from "./screens/DoctorAppointment/DoctorAppointment";
import DoctorBySpecialty from "./screens/Specialty/DoctorBySpecialty";
import SpecialtyDetails from "./screens/Specialty/SpecialtyDetails";
import Drug from "./screens/Drug/Drug";

const App = () => {
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null,
  );
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />

        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/specialty" element={<Specialty />} />
            <Route path="/doctor-schedules" element={<DoctorSchedule />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/my-appointments" element={<MyAppointment />} />
            <Route path="/admin-appointments" element={<AdminAppointment />} />
            <Route path="/doctor-work-schedule" element={<DoctorWorkSchedule />} />
            <Route path="/doctor-appointments" element={<DoctorAppointment />} />
            <Route path="/specialties/:specialtyId/doctors" element={<DoctorBySpecialty/>} />
            <Route path="/specialties/:specialtyId" element={<SpecialtyDetails />} />
            <Route path="/admin-drugs" element={<Drug />} />
          </Routes>
        </Container>

        <Footer />
      </BrowserRouter>
    </MyUserContext.Provider>
  );
};

export default App;
