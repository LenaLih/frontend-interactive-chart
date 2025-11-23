import {type ReactNode, useRef, useState} from "react";
import {useOutsideClick} from "../../../hooks/useOutsideClick.ts";
import s from "./dropdown.module.css";

type Props = {
    label: ReactNode;
    children: ReactNode;
};

export const Dropdown = ({label, children}: Props) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useOutsideClick(ref, () => setOpen(false));

    return (
        <div className={s.wrapper} ref={ref}>
            <button
                className={`${s.trigger} ${open ? s.open : ""}`}
                onClick={() => setOpen(prev => !prev)}
            >
                {label}
                <span className={s.arrow}/>
            </button>

            {open && <div className={s.dropdown}>{children}</div>}
        </div>
    );
};