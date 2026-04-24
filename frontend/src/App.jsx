import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import CreateBon from "./pages/CreateBon";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />
   <Route path="/login" element={<Login />} />
        {/* DASHBOARD WRAPPED */}
       <Route path="/dashboard" element={<Dashboard />} />
<Route path="/create-bon" element={<CreateBon />} />
        
        

        {/* PROFILE WRAPPED */}
        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;