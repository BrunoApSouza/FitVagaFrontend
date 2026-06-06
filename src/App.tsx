import AnaliseForm from './components/AnaliseForm'

export default function App() {
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900">FitVaga</h1>
                    <p className="text-gray-500 mt-2">Analise a compatibilidade entre seu curriculo e a vaga</p>
                </div>
                <div className="bg-white rounded-lg shadow p-6">
                    <AnaliseForm />
                </div>
            </div>
        </div>
    )
}