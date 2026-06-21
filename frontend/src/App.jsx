import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import QuoteField from './components/QuoteField';
import QuoteCard from './components/QuoteCard';
import './index.css';


const App = () => {

    const [quotes, setQuotes] = useState([{text: "It is what it is", author: "Rogue"}])
    const addQuote = ({text, author}) => {
        if (text.trim() !== "" && author.trim() !== ""){

            setQuotes(quotes => [...quotes, {text: text, author:author}])
            toast.success("Quote has been submitted!", { position: "top-center" })
        }
    }
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Toaster />
            <div className="p-6 space-y-6">
            <QuoteField addQuote={addQuote} />
            <QuoteCard quotes={quotes} />
            </div>

        </div>
    );
}

export default App