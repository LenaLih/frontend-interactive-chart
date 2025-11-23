import {useMemo, useState} from "react";
import type {DayData, Variation} from "../../utils/prepareData.ts";
import {LineStyleSelector} from "../controls/LineStyleSelector.tsx";
import {ModeSelector} from "../controls/ModeSelector.tsx";
import {ThemeToggle} from "../controls/ThemeToggle.tsx";
import {VariationsSelector} from "../controls/VariationsSelector.tsx";
import {LineChartView} from "../lineChartView/LineChartView.tsx";
import s from "./chartContainer.module.css"

type Props = {
    data: DayData[];
    variations: Variation[];
}
export const ChartContainer = ({data, variations}: Props) => {

    const allIds = variations.map(v => v.id ?? '0');
    const [selected, setSelected] = useState<string[]>(allIds);
    const [mode, setMode] = useState<'day' | 'week'>('day');
    const [lineStyle, setLineStyle] = useState<'line' | 'smooth' | 'area'>('smooth');


    const toggleVariation = (id: string): void => {
        if (selected.length === 1 && selected[0] === id) return;
        if (selected.includes(id)) {
            setSelected(selected.filter(item => item !== id))
        } else {
            setSelected([...selected, id])
        }
    }
    const visibleVariations = variations.filter(v => selected.includes(v.id ?? '0'))

    const weeklyData = useMemo(() => {
        if (mode === "day") return data;
        const weeks: Record<string, any> = {};

        data.forEach(day => {
            const d = new Date(day.date);
            const year = d.getFullYear();
            const week = `${year}-W${String(getWeekNumber(d)).padStart(2, "0")}`;

            if (!weeks[week]) {
                weeks[week] = {date: week};
                variations.forEach(v => {
                    const id = v.id ?? "0";
                    weeks[week][`${id}_visits`] = 0;
                    weeks[week][`${id}_conv`] = 0;
                });
            }
            variations.forEach(v => {
                const id = v.id ?? "0";
                weeks[week][`${id}_visits`] += Number(day[`${id}_visits`] ?? 0);
                weeks[week][`${id}_conv`] += Number(day[`${id}_conv`] ?? 0);
            });
        });
        return Object.values(weeks).map(week => {
            variations.forEach(v => {
                const id = v.id ?? "0";
                const visits = week[`${id}_visits`];
                const conv = week[`${id}_conv`];
                week[id] = visits > 0 ? Number(((conv / visits) * 100).toFixed(2)) : 0;
            });

            return week;
        });

    }, [mode, data, variations]);

    function getWeekNumber(date: Date) {
        const temp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = temp.getUTCDay() || 7;
        temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
        return Math.ceil((((temp as any) - (yearStart as any)) / 86400000 + 1) / 7);
    }

    return (
        <>
            <div className={s.topBar}>
                <div className={s.left}>
                    <VariationsSelector variations={variations} selected={selected} onToggle={toggleVariation}/>
                    <ModeSelector mode={mode} onChange={setMode}/>
                </div>
                <div className={s.right}>
                    <LineStyleSelector value={lineStyle} onChange={setLineStyle}/>
                    <ThemeToggle/>
                </div>
            </div>
            <LineChartView data={mode === "day" ? data : weeklyData}
                           variations={visibleVariations} lineStyle={lineStyle}/>
        </>
    )
}