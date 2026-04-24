import Logo from "../components/logo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      console.log(res.data);

      // sauvegarder token
      localStorage.setItem("token", res.data.token);

      // redirection
      navigate("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    
  <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
    <div className="absolute top-6 left-6">
      <Logo />
    </div>
    {/* 🌌 Background glow */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a,transparent_40%),radial-gradient(circle_at_bottom,#9333ea,transparent_40%)] opacity-60"></div>

    {/* ✨ Animated grid */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20"></div>

    {/* LOGIN CARD */}
    <div className="relative z-10 w-96">

      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome back
        </h2>

        <p className="text-gray-300 text-center mb-6 text-sm">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin}>

          <input
            className="w-full p-3 mb-4 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-400"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 mb-5 rounded-lg bg-black/30 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:border-purple-400"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-[1.02] transition"
            type="submit"
          >
            Sign in
          </button>

        </form>

        <p className="text-center text-xs text-gray-400 mt-5">
          EasyDelivery • Secure Access
        </p>

      </div>
    </div>
  </div>
);
}

export default Login;