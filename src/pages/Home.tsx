import AnaliseForm from '../components/AnaliseForm';
import RoleSelector from '../components/RoleSelector';
import { useUserRole } from '../context/UserContext';

export default function Home() {
  const { role, clearRole } = useUserRole();

  if (!role) {
    return <RoleSelector />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">FitVaga</h1>
          <p className="text-gray-500 mt-2">
            {role === 'candidato' 
              ? 'Analise a compatibilidade entre seu currículo e a vaga'
              : 'Gerencie suas vagas e candidatos'}
          </p>
        </div>

        {/* Botão pra trocar de role */}
        <div className="text-center mb-4">
          <button
            onClick={clearRole}
            className="text-sm text-indigo-600 hover:text-indigo-700 underline"
          >
            Trocar de perfil
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          {role === 'candidato' ? (
            <AnaliseForm />
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">Em breve: Dashboard de Recrutador</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}