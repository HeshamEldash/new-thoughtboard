import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./ContextManagers/AuthContext";
import "./styles.css";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RegisterationPage from "./pages/Registration";

function App() {
  
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Header className="Header" />
          <Routes>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegisterationPage />} path="/register" />
            <Route element={<PrivateRoutes />}>
              <Route element={<Dashboard />} path="/dashboard" />
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
