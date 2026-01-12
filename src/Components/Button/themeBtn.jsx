import { FaMoon } from "react-icons/fa"
import useTheme from "../../Hooks/useTheme"
import { FiSun } from "react-icons/fi"

export default function ThemeBtn({ size }) {
    const { theme, setTheme } = useTheme()
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`btn btn-primary trns rounded-lg w-${size}`}
        >
            <div className="mx-auto w-fit">
                {theme === "dark" ? <FiSun /> : <FaMoon />}
            </div>
        </button>
    )
}