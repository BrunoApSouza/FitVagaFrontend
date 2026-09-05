import { useUserRole } from '../context/UserContext';

export default function RoleSelector() {
  const { setRole } = useUserRole();

  const handleCandidato = () => {
    console.log('Clicou em Candidato');
    setRole('candidato');
  };

  const handleRecrutador = () => {
    console.log('Clicou em Recrutador');
    setRole('recrutador');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-2xl p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">FitVaga</h1>
          <p className="text-gray-600">Como você deseja usar a plataforma?</p>
        </div>

        <div className="space-y-4">
          {/* Botão Candidato */}
          <button
            onClick={handleCandidato}
            className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-lg transition duration-200"
          >
            <div className="text-lg">Sou Candidato</div>
            <div className="text-sm font-normal opacity-90">
              Analisar compatibilidade com vagas
            </div>
          </button>

          {/* Botão Recrutador */}
          <button
            onClick={handleRecrutador}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg transition duration-200"
          >
            <div className="text-lg">Sou Recrutador</div>
            <div className="text-sm font-normal opacity-90">
              Gerenciar vagas e candidatos
            </div>
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-8">
          Você pode mudar isso depois
        </p>
      </div>
    </div>
  );
}