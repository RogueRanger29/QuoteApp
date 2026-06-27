import { useNavigate } from "react-router-dom";

const Topbar = () => {
    const navigate = useNavigate()
    return (
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950">
            <div className="flex items-center gap-3">
                <img
                    src={"/quote-icon-inverted.jpg"}
                    alt="Quote's Up Logo"
                    className="w-10 h-10"
                />

                <h1 className="text-2xl font-bold text-white">
                    Quote's Up
                </h1>
            </div>

            <button
                onClick={() => {localStorage.clear(); navigate("/sign-in")}}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
                <img
                    src={"/logout.png"}
                    alt="Action"
                    className="w-8 h-8"
                />
            </button>
        </header>
    )
}

export default Topbar
