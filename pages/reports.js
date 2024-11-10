import jsPDF from 'jspdf';

export default function Reports() {
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Sintomas", 10, 10);
    doc.save("relatorio.pdf");
  };

  return (
    <div className="flex flex-col items-center h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Relatórios para Médicos</h1>
      <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition">
        Exportar PDF
      </button>
    </div>
  );
}
