import type { ReactNode } from "react"

export type AnaliseFitResponse = {
    [x: string]: ReactNode
    scoreFit: number
    pontosFortes: string
    gaps: string
    cartaApresentacao: string
}