import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

 return (
    <>
    <Navbar />
  <div className="min-h-screen bg-black relative flex items-center justify-center overflow-hidden">
    
    {/* 🌌 background glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a,transparent_40%),radial-gradient(circle_at_bottom,#9333ea,transparent_40%)] opacity-60"></div>

    {/* grid effect */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>

    {/* CARD */}
    <div className="relative z-10 w-96">

      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl text-white">

        <h2 className="text-2xl font-bold text-center mb-6">
          My Profile
        </h2>

        {user ? (
          <div className="space-y-4">

            {/* avatar */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-xl font-bold">
                {user.email.charAt(0).toUpperCase()}
              </div>
            </div>

            {/* info card */}
            <div className="bg-black/30 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-300">ID</p>
              <p className="font-semibold">{user.id}</p>
            </div>

            <div className="bg-black/30 p-4 rounded-lg border border-white/10">
              <p className="text-sm text-gray-300">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>

          </div>
        ) : (
          <p className="text-center text-gray-300">Loading...</p>
        )}

        <p className="text-center text-xs text-gray-400 mt-6">
          EasyDelivery • Secure Access
        </p>

      </div>
    </div>
  </div>
   </>
);
}

export default Profile;