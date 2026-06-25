import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import QuoteCard from '../components/QuoteCard'
import QuoteField from '../components/QuoteField'
import '../index.css';
import axios from 'axios';

const Home = () => {
    const [quotes, setQuotes] = useState([])

    const createQuote = async ({text, author}) => {
        try {
            const payload = {
                text: text,
                author: author
            }
            const response = await axios.post("http://localhost:4000/api/v1/quotes/create", payload)
            const success = response.status === 201
            return success
        } catch (error) {
            console.log(error)
        }
    }

    const getQuotes = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/v1/quotes/getQuotes")
            const newQuotes = response.data.map(item => {
                return {text: item.text, author: item.author}
            })

            setQuotes(newQuotes)
        } catch (error) {
            console.log(error)
        }
    }

    const addQuote = async ({text, author}) => {
        const quoteAdded = await createQuote({text, author})
        if (quoteAdded){
            toast.success("Quote has been submitted!", { position: "top-center" })
        }
        else{
            toast.error("Something went wrong.")
            return
        }

        getQuotes()
    }


    useEffect(() => {
        getQuotes()
    }, [])
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

export default Home