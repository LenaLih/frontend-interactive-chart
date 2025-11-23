import rawJson from "../data/data.json";

export type Variation = {
    id?: string
    name: string
}

type RawDay = {
    date: string;
    visits: Record<string, number>;
    conversions: Record<string, number>;
}

type RawData = {
    variations: Variation[];
    data: RawDay[];
}
const raw = rawJson as RawData;

export type DayData = {
    date: string
    [key: string]: number | string
}

export const prepareData = (): DayData[] => {
    const {variations, data} = raw

    return data.map((day) => {
        const row: DayData = {date: day.date}
        variations.forEach(v => {
            const variationId = v.id ? String(v.id) : '0'

            const visits = day.visits[variationId] ?? 0
            const conversions = day.conversions[variationId] ?? 0

            const rate = visits > 0 ? (conversions / visits) * 100 : 0
            row[variationId] = Number(rate.toFixed(2))

            row[`${variationId}_visits`] = visits;
            row[`${variationId}_conv`] = conversions;
        })

        return row
    })
}