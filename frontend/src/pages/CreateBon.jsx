import { useState } from "react";
import axios from "axios";
import Logo from "../components/logo";
import { useNavigate } from "react-router-dom";

function CreateBon() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [form, setForm] = useState({
    type: "",
    client: "",
    produit: "",
    quantite: "",
    date_livraison: "",
  });

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !form.type ||
      !form.client ||
      !form.produit ||
      !form.quantite ||
      !form.date_livraison
    ) {
      setErrorMessage("Veuillez remplir tous les champs ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/bons", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Message succès
      setSuccessMessage("Bon créé avec succès ✅");

      // reset form
      setForm({
        type: "",
        client: "",
        produit: "",
        quantite: "",
        date_livraison: "",
      });

      // ✅ redirection après 2s
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      console.error(err);
      setErrorMessage("Erreur lors de la création du bon ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e3a8a,transparent_40%),radial-gradient(circle_at_bottom,#9333ea,transparent_40%)] opacity-60"></div>

      {/* LOGO */}
      <div
        className="absolute top-6 left-6 cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        <Logo />
      </div>

      {/* CARD */}
      <div className="relative z-10 w-96 backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl">

        <h2 className="text-2xl font-bold text-center mb-6">
          Create Bon
        </h2>

        {/* ✅ SUCCESS MESSAGE */}
        {successMessage && (
          <div className="bg-green-500/20 border border-green-400 text-green-300 p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        {/* ❌ ERROR MESSAGE */}
        {errorMessage && (
          <div className="bg-red-500/20 border border-red-400 text-red-300 p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">

          {/* TYPE */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black/30 border border-white/10"
          >
            <option value="">Select Type</option>
            <option value="livraison">Livraison</option>
            <option value="retour">Retour</option>
            <option value="transfert">Transfert</option>
          </select>

          {/* CLIENT */}
          <input
            name="client"
            placeholder="Client (ex: Client A)"
            value={form.client}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black/30 border border-white/10"
          />

          {/* PRODUIT */}
          <input
            name="produit"
            placeholder="Produit (ex: Ciment)"
            value={form.produit}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black/30 border border-white/10"
          />

          {/* QUANTITE */}
          <input
            name="quantite"
            type="number"
            placeholder="Quantité"
            value={form.quantite}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black/30 border border-white/10"
          />

          {/* DATE */}
          <input
            name="date_livraison"
            type="date"
            value={form.date_livraison}
            onChange={handleChange}
            className="w-full p-3 rounded bg-black/30 border border-white/10"
          />

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full p-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default CreateBon;