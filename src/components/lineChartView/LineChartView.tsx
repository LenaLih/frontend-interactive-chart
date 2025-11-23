import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Area,
} from "recharts";
import {COLORS} from "../../styles/colors.ts";
import {CustomTooltip} from "./customTooltip/CustomTooltip.tsx";
import s from "./lineChartView.module.css";

type Props = {
    data: any[];
    variations: { id?: string; name: string }[];
    lineStyle: "line" | "smooth" | "area";
};

export const LineChartView = ({data, variations, lineStyle}: Props) => {
    console.log("First point:", data[0]);

    return (
        <div className={s.chartWrapper}>
            <ResponsiveContainer width="100%" height={450}>
                <ComposedChart data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
                    <XAxis dataKey="date" tickFormatter={(v) => v} tick={{fontSize: 12}}/>
                    <YAxis unit="%" tick={{fontSize: 12}}/>
                    <Tooltip content={<CustomTooltip/>}/>

                    {lineStyle === "area" &&
                        variations.map((v) => {
                            const id = v.id ?? "0";
                            return (
                                <defs key={id}>
                                    <linearGradient id={`color_${id}`} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={COLORS[id]} stopOpacity={0.4}/>
                                        <stop offset="100%" stopColor={COLORS[id]} stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                            );
                        })
                    }

                    {variations.map((v) => {
                        const id = v.id ?? "0";

                        if (lineStyle === "area") {
                            return (
                                <Area
                                    key={id}
                                    type="monotone"
                                    dataKey={id}
                                    name={v.name}
                                    stroke={COLORS[id]}
                                    fill={`url(#color_${id})`}
                                    strokeWidth={2}
                                />
                            );
                        }

                        return (
                            <Line
                                key={id}
                                type={lineStyle === "smooth" ? "monotone" : "linear"}
                                dataKey={id}
                                name={v.name}
                                stroke={COLORS[id]}
                                dot={false}
                                strokeWidth={2}
                                activeDot={{r: 4}}
                            />
                        );
                    })}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};
