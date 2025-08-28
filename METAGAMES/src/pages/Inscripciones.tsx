import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Trophy, Search, Filter } from 'lucide-react';

const ProspectForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: ""
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    fetch("https://ClementeUrzua.pythonanywhere.com/prospectos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setStatus("✅ Prospecto registrado con éxito");
          setFormData({ nombre: "", email: "", telefono: "" });
        } else {
          setStatus(`⚠️ Error: ${data.error || "No se pudo registrar"}`);
        }
      })
      .catch(() => setStatus("❌ Error de conexión con el servidor"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-purple-300 text-center mb-6">
          Registro de Jugadores
        </h2>

        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre completo"
          required
          className="w-full mb-4 px-4 py-2 rounded-xl bg-gray-900 text-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full mb-4 px-4 py-2 rounded-xl bg-gray-900 text-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono (opcional)"
          className="w-full mb-6 px-4 py-2 rounded-xl bg-gray-900 text-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
        >
          Guardar
        </button>

        {status && (
          <p className="mt-4 text-center text-sm text-gray-300">{status}</p>
        )}
      </form>
    </div>
  );
};

export default ProspectForm;
