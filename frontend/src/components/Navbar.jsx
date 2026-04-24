import Logo from "./logo";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full px-6 py-4 flex justify-between items-center 
                    bg-transparent backdrop-blur-xl 
                    border-b border-white/10 fixed top-0 left-0 z-50">

      {/* LEFT - LOGO */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <Logo />
      </div>

      {/* RIGHT - BUTTONS */}
      <div className="flex items-center gap-6">

        <button
          onClick={() => navigate("/profile")}
          className="text-white hover:text-blue-400 transition"
        >
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;