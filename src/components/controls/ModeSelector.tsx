import s from "../common/dropdown/dropdown.module.css";
import {Dropdown} from "../common/dropdown/Dropdown.tsx";

type Props = {
    mode: 'day' | 'week';
    onChange: (mode: 'day' | 'week') => void;
}
export const ModeSelector = ({mode, onChange}: Props) => {
    return (
        <Dropdown label={mode === "day" ? "Day" : "Week"}>
            <div className={s.item} onClick={() => onChange("day")}>Day</div>
            <div className={s.item} onClick={() => onChange("week")}>Week</div>
        </Dropdown>
    )
}