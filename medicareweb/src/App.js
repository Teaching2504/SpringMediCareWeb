import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home/Home";
import Doctor from "./screens/Doctor/Doctor";
import { Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import Register from "./screens/User/Register";
import Login from "./screens/User/Login";
import { useReducer } from "react";
import Specialty from "./screens/Specialty/Specialty";

const App = () => {
  return (
        <BrowserRouter>
          <Header />

          <Container>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/doctor" element={<Doctor />}/>
              <Route path="/specialty" element={<Specialty/>}/>
            </Routes>
          </Container>

          <Footer />
        </BrowserRouter>
  );
}

export default App;