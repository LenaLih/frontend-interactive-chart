import {COLORS} from "../../../styles/colors.ts";
import s from "./CustomTooltip.module.css";

type Props = {
    active?: boolean;
    payload?: any[];
    label?: string;
};

export const CustomTooltip = ({active, payload, label}: Props) => {
    if (!active || !payload || payload.length === 0) return null;

    const sorted = [...payload].sort((a, b) => Number(b.value) - Number(a.value));

    const formatDate = (raw: string) => {
        const d = new Date(raw);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };

    function getWeekRange(weekStr: string) {
        const [year, weekWithW] = weekStr.split("-");
        const week = Number(weekWithW.replace("W", ""));

        const simple = new Date(Number(year), 0, 1 + (week - 1) * 7);
        const dow = simple.getDay();
        const monday = new Date(simple);

        if (dow <= 4) {
            monday.setDate(simple.getDate() - dow + 1);
        } else {
            monday.setDate(simple.getDate() + (8 - dow));
        }

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        return {start: monday, end: sunday};
    }

    function formatRange(start: Date, end: Date) {
        const fmt = (d: Date) =>
            d.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });

        return `${fmt(start)}–${fmt(end)}`;
    }

    return (
        <div className={s.tooltip}>
            <div className={s.date}>
                {label && label.includes("W")
                    ? (() => {
                        const {start, end} = getWeekRange(label);
                        const weekNum = label.split("W")[1];
                        return `Week ${weekNum} (${formatRange(start, end)})`;
                    })()
                    : label
                        ? formatDate(label)
                        : ""}
            </div>
            <div className={s.list}>
                {sorted.map((item) => (
                    <div key={item.dataKey} className={s.row}>
                    <span
                        className={s.dot}
                        style={{background: COLORS[item.dataKey]}}
                    />
                        <span className={s.name}>{item.name}</span>
                        <span className={s.value}>{Number(item.value).toFixed(2)}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
};