import React, { useState } from 'react'
import type { AnaliseFitResponse } from '../types/AnaliseFitResponse'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function AnaliseForm() {
    const [curriculoId, setCurriculoId] = useState('1')
    const [descricaoVaga, setDescricaoVaga] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<AnaliseFitResponse | null>(null)
    const [error, setError] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const resp = await fetch(`${API_URL}/api/Analise`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ curriculoId: Number(curriculoId), descricaoVaga }),
            })
            if (!resp.ok) throw new Error(await resp.text())
            const data = (await resp.json()) as AnaliseFitResponse
            setResult(data)
        } catch (err: any) {
            setError(err.message || 'Erro ao analisar')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Curriculo ID</label>
                <input
                    value={curriculoId}
                    onChange={e => setCurriculoId(e.target.value)}
                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Descricao da vaga</label>
                <textarea
                    value={descricaoVaga}
                    onChange={e => setDescricaoVaga(e.target.value)}
                    rows={6}
                    placeholder="Cole aqui a descricao completa da vaga..."
                    className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Analisando...' : 'Analisar Fit'}
            </button>

            {error && <div className="text-red-600 mt-2">{error}</div>}

            {result && (
                <div className="mt-6 p-6 bg-white rounded-lg shadow space-y-4">
                    <div className="text-center">
                        <span className="text-5xl font-bold text-blue-600">{result.scoreFit}%</span>
                        <p className="text-gray-500 mt-1">Score de Compatibilidade</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-green-700">Pontos Fortes</h3>
                        <p className="text-gray-700 mt-1">{result.pontosFortres}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-red-600">Gaps</h3>
                        <p className="text-gray-700 mt-1">{result.gaps}</p>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">Carta de Apresentacao</h3>
                        <p className="text-gray-700 mt-1 whitespace-pre-wrap">{result.cartaApresentacao}</p>
                    </div>
                </div>
            )}
        </form>
    )
}