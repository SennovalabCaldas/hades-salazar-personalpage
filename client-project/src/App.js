import React, { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Auth } from "./api";
import { Login } from "./components/Login/Login";
import { useDispatch } from "react-redux";
import { getMe } from "./redux/userSlice";
import AdminRoutes from "./router/AdminRoutes";
import { Register } from "./components/Register/Register";
import { Home } from "./components/WebComponents/Home";
import "./App.scss";
import { AcademicExperience } from "./components/WebComponents/AcademicExperience/AcademicExperience";

const auth = new Auth();

function App() {
  const dispatch = useDispatch();
  const token = auth.getAccessToken();
  console.log(token);

  useEffect(() => {
    const getMeResponse = async () => {
      try {
        const response = await auth.getMe();
        if (response.data) {
          dispatch(getMe(response.data));
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    if (token) {
      getMeResponse();
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {token ? (
          <Route path="/*" element={<AdminRoutes />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<AcademicExperience />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* <Route path="/*" element={<Navigate to="/" replace />} /> */}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
