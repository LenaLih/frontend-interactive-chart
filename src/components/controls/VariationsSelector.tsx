import type {Variation} from "../../utils/prepareData.ts";
import s from "../common/dropdown/dropdown.module.css";
import {Dropdown} from "../common/dropdown/Dropdown.tsx";

type Props = {
    onToggle: (id: string) => void;
    variations: Variation[];
    selected: string[];
}
export const VariationsSelector = ({onToggle, variations, selected}: Props) => {
    const allIds = variations.map(v => v.id ?? "0");
    const label =
        selected.length === allIds.length
            ? "All variations selected"
            : selected.length === 0
                ? "No variations selected"
                : `${selected.length} selected`;

    return (
        <Dropdown label={label}>
            {variations.map(v => {
                const id = v.id ?? "0";

                return (
                    <label key={id} className={s.item}>
                        <input
                            type="checkbox"
                            checked={selected.includes(id)}
                            onChange={() => onToggle(id)}
                        />
                        {v.name}
                    </label>
                );
            })}
        </Dropdown>
    )
}