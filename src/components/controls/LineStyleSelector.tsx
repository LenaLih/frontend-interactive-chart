import s from "../common/dropdown/dropdown.module.css";
import {Dropdown} from "../common/dropdown/Dropdown.tsx";

type Props = {
    value: "line" | "smooth" | "area";
    onChange: (v: "line" | "smooth" | "area") => void;
};

export const LineStyleSelector = ({value, onChange}: Props) => {
    const labelMap = {
        line: "Line",
        smooth: "Smooth",
        area: "Area",
    };

    return (
        <Dropdown label={`Line style: ${labelMap[value]}`}>
            {(["line", "smooth", "area"] as const).map(item => (
                <div
                    key={item}
                    className={s.item}
                    onClick={() => onChange(item)}
                >
                    {labelMap[item]}
                </div>
            ))}
        </Dropdown>
    );
};