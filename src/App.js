import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Dashboard, LeavesPage, UserPage } from "./pages";
import { LoginForm, RegistrationForm } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const AuthRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user" element={<UserPage />} />
        <Route path="leave" element={<LeavesPage />} />
        <Route
          index
          path="/"
          element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          }
        />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="login" element={<LoginForm />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App;
