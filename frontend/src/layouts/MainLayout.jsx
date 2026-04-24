import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white">

      {/* NAVBAR GLOBAL */}
      <Navbar />

      {/* CONTENT */}
      <div className="pt-20 px-6">
        {children}
      </div>

    </div>
  );
}

export default MainLayout;