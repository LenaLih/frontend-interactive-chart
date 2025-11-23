import {useTheme} from "../../contexts/ThemeProvider.tsx";
import s from "../common/dropdown/dropdown.module.css"

export const ThemeToggle = () => {
    const {theme, toggleTheme} = useTheme();
    return (
        <button onClick={toggleTheme}
                className={s.themeBtn}>{theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
    )
}