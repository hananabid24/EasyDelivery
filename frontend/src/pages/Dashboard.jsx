import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/logo";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [bons, setBons] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🔥 FETCH
  const fetchBons = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get("http://localhost:5000/api/bons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBons(res.data.bons || res.data || []);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des bons ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBons();
  }, []);

  // ✅ FILTER + SEARCH COMBINÉ
  const filteredBons = bons.filter((b) => {
    const matchStatus =
      filter === "all" || b.statut === filter;

    const matchSearch =
      (b.client || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (b.produit || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  // COUNT
  const count = (status) =>
    status === "all"
      ? bons.length
      : bons.filter((b) => b.statut === status).length;

  // COLORS
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-400";
      case "rejected":
        return "text-red-400";
      default:
        return "text-yellow-300";
    }
  };

  // 🔥 UPDATE STATUS
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/bons/${id}`,
        { statut: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBons((prev) =>
        prev.map((b) =>
          b.id === id ? { ...b, statut: newStatus } : b
        )
      );
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la mise à jour ❌");
    }
  };

  // 🔥 DELETE
  const deleteBon = async (id) => {
    if (!window.confirm("Supprimer ce bon ?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/bons/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBons((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la suppression ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a,transparent_40%),radial-gradient(circle_at_bottom,#9333ea,transparent_40%)] opacity-60"></div>

      <div className="relative z-10 p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <Logo />

          <div className="flex gap-3">
            <button onClick={() => navigate("/profile")} className="px-4 py-2 bg-white/10 rounded-lg">
              Profile
            </button>

            <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded-lg">
              Logout
            </button>

            <button onClick={() => navigate("/create-bon")} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              + Create Bon
            </button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-3 mb-4 flex-wrap">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg ${
                filter === status
                  ? "bg-white text-black"
                  : "bg-white/10"
              }`}
            >
              {status} ({count(status)})
            </button>
          ))}
        </div>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search client or produit..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black/30 border border-white/10"
        />

        {/* ❌ ERROR */}
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* CONTENT */}
        {loading ? (
          <p className="text-gray-300">Loading...</p>
        ) : filteredBons.length === 0 ? (
          <p className="text-gray-400">No bons found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white/5 rounded-xl overflow-hidden">

              <thead className="bg-white/10">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Produit</th>
                  <th className="p-3">Quantité</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Statut</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBons.map((bon) => (
                  <tr key={bon.id} className="border-t border-white/10">

                    <td className="p-3">{bon.id}</td>
                    <td className="p-3">{bon.type}</td>
                    <td className="p-3">{bon.client}</td>
                    <td className="p-3">{bon.produit}</td>
                    <td className="p-3">{bon.quantite}</td>

                    <td className="p-3">
                      {new Date(bon.date_livraison).toLocaleDateString()}
                    </td>

                    <td className={`p-3 font-bold ${getStatusColor(bon.statut)}`}>
                      {bon.statut}
                    </td>

                    <td className="p-3 flex gap-2">

                      <button
                        onClick={() => updateStatus(bon.id, "approved")}
                        className="px-2 py-1 bg-green-500 rounded text-sm"
                      >
                        ✔
                      </button>

                      <button
                        onClick={() => updateStatus(bon.id, "rejected")}
                        className="px-2 py-1 bg-red-500 rounded text-sm"
                      >
                        ✖
                      </button>

                      <button
                        onClick={() => deleteBon(bon.id)}
                        className="px-2 py-1 bg-gray-600 rounded text-sm"
                      >
                        🗑
                      </button>

                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;