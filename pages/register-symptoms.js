import { useState } from 'react';

export default function RegisterSymptoms() {
  const [intensity, setIntensity] = useState('');
  const [duration, setDuration] = useState('');
  const [diet, setDiet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Adicionar lógica para salvar dados
    alert("Registro salvo!");
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Registro de Sintomas</h1>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Intensidade do Sintoma</label>
            <input type="number" value={intensity} onChange={(e) => setIntensity(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Duração</label>
            <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-gray-700">Dieta</label>
            <input type="text" value={diet} onChange={(e) => setDiet(e.target.value)} className="w-full border border-gray-300 p-2 rounded-lg" />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
