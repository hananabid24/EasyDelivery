import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Logo() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/")}
      className="flex items-center gap-3 cursor-pointer group"
    >

      {/* ICON */}
      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md 
                      flex items-center justify-center border border-white/30
                      group-hover:scale-110 transition duration-300
                      group-hover:bg-white/30">

        <Truck className="text-white w-5 h-5" />
      </div>

      {/* TEXT */}
      <div className="leading-tight">
        <p className="text-white font-bold group-hover:text-blue-300 transition">
          EasyDelivery
        </p>
        <p className="text-xs text-gray-300">
          Fast Delivery System
        </p>
      </div>

    </div>
  );
}

export default Logo;