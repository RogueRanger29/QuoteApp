import { useState } from "react";

const QuoteCard = ({ quotes }) => {
    const [index, setIndex] = useState(0);

    if (quotes.length === 0) {
        return <div>No quotes yet</div>;
    }

    const showRandomQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setIndex(randomIndex);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="
                w-full
                max-w-4xl
                h-[400px]
                bg-gray-900
                rounded-2xl
                shadow-xl
                flex
                flex-col
                items-center
                justify-center
                gap-12
            ">
                <h2 className="text-4xl font-light text-center max-2w-2xl italic">{'"' + quotes[index].text + '"'}</h2>
                <h2 className="text-2xl font-light text-center max-2w-2xl italic">{"-" + quotes[index].author}</h2>
            </div>

            <button onClick={showRandomQuote} className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200">
                New Quote
            </button>
        </div>
    );
};

export default QuoteCard;