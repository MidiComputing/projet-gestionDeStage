import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Components/LogIn/Login";
import { getUser } from "./JS/actions/useraction";
import StudentDashboard from "./Components/Dashboard/StudentDashboard";
import TeacherDashboard from "./Components/Dashboard/TeacherDashboard";
import AdminDashboard from "./Components/Dashboard/AdminDashboard";
import PrivateRoute from "./Components";

function App() {
  const currentUser = useSelector((state) => state.userR.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            {currentUser?.role == "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )}
          </PrivateRoute>
        }
      />
      <Route
        path="/teacher"
        element={
          <PrivateRoute>
            {currentUser?.role == "teacher" ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/login" />
            )}
          </PrivateRoute>
        }
      />
      <Route
        path="/student"
        element={
          <PrivateRoute>
            {currentUser?.role == "student" ? (
              <StudentDashboard />
            ) : (
              <Navigate to="/login" />
            )}
          </PrivateRoute>
        }
      />
        <Route
        path="/teacher"
        element={
          <PrivateRoute>
            {currentUser?.role == "teacher" ? (
              <TeacherDashboard />
            ) : (
              <Navigate to="/login" />
            )}
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
