import React, { useEffect, useState } from 'react'
import type { Curriculo } from '../types/Curriculo'
import type { AnaliseFitResponse } from '../types/AnaliseFitResponse'

const API_URL = import.meta.env.VITE_API_URL || ''

export default function AnaliseForm() {
    const [curriculoId, setCurriculoId] = useState('')
    const [curriculos, setCurriculos] = useState<Curriculo[]>([])
    const [descricaoVaga, setDescricaoVaga] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] =
        useState<AnaliseFitResponse | null>(
            null
        )
    const [error, setError] = useState('')

    useEffect(() => {
        async function carregarCurriculos() {
            try {
                const response =
                    await fetch(
                        `${API_URL}/api/Curriculos`
                    )

                const data =
                    await response.json()

                setCurriculos(data)

                if (data.length > 0) {
                    setCurriculoId(
                        data[0].id.toString()
                    )
                }
            } catch (error) {
                console.error(
                    'Erro ao carregar currículos',
                    error
                )
            }
        }

        carregarCurriculos()
    }, [])

    async function handleSubmit(
        e: React.FormEvent
    ) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const resp = await fetch(
                `${API_URL}/api/Analise`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    body: JSON.stringify({
                        curriculoId:
                            Number(curriculoId),
                        descricaoVaga,
                    }),
                }
            )

            if (!resp.ok) {
                throw new Error(
                    await resp.text()
                )
            }

            const data =
                (await resp.json()) as AnaliseFitResponse

            setResult(data)
        } catch (err: any) {
            setError(
                err.message ||
                'Erro ao analisar'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-700">
                        FitVaga
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Analise a compatibilidade
                        entre seu currículo e a
                        vaga desejada
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Selecione o currículo
                        </label>

                        <select
                            value={curriculoId}
                            onChange={e =>
                                setCurriculoId(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {curriculos.map(
                                curriculo => (
                                    <option
                                        key={
                                            curriculo.id
                                        }
                                        value={
                                            curriculo.id
                                        }
                                    >
                                        {
                                            curriculo.nome
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descrição da vaga
                        </label>

                        <textarea
                            value={descricaoVaga}
                            onChange={e =>
                                setDescricaoVaga(
                                    e.target.value
                                )
                            }
                            rows={6}
                            placeholder="Cole aqui a descrição completa da vaga..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                    >
                        {loading
                            ? 'Analisando...'
                            : 'Analisar Fit'}
                    </button>

                    {error && (
                        <div className="text-red-600 text-center">
                            {error}
                        </div>
                    )}
                </form>

                {result && (
                    <div className="mt-10 border-t pt-8">

                        <div className="text-center mb-8">
                            <span className="text-7xl font-bold text-blue-600">
                                {
                                    result.scoreFit
                                }
                                %
                            </span>

                            <p className="text-gray-500 mt-2">
                                Score de
                                Compatibilidade
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">

                            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                <h3 className="font-bold text-green-700 text-lg mb-2">
                                    Pontos Fortes
                                </h3>

                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {
                                        result.pontosFortes
                                    }
                                </p>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                                <h3 className="font-bold text-red-600 text-lg mb-2">
                                    Gaps
                                </h3>

                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {
                                        result.gaps
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 bg-gray-50 border rounded-xl p-5">
                            <h3 className="font-bold text-gray-800 text-lg mb-2">
                                Carta de
                                Apresentação
                            </h3>

                            <p className="text-gray-700 whitespace-pre-wrap">
                                {
                                    result.cartaApresentacao
                                }
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}