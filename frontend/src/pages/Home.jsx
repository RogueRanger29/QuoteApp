import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import QuoteCard from '../components/QuoteCard'
import QuoteField from '../components/QuoteField'
import Topbar from '../components/Topbar'
import '../index.css';
import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("token") === null){
                navigate("/sign-in")
                return
            }
            try {
                const response  = await axios.get(API_BASE_URL+"/auth/me", {
                    headers : {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                })

                await getQuotes()
            } catch (error) {
                navigate("/sign-in")
                return
            }
        }

        checkAuth()
    }, [])

    const createQuote = async ({text, author}) => {
        try {
            const payload = {
                text: text,
                author: author
            }
            const response = await axios.post(API_BASE_URL+"/quotes/create", payload, {
                headers : {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            const success = response.status === 201
            toast.success("Quote has been submitted!", { position: "top-center" })
            return success
        } catch (error) {
            if (error.response?.status === 401) navigate("/sign-in")
            else if (error.response?.status === 409) toast.error("Quote already exists!", { position: "top-center" })
            else if (error.response?.status === 429) toast.error("Too Many Quotes in 1 minute!", { position: "top-center" })
            else toast.error("Something went wrong", { position: "top-center"})
        }
    }

    const getQuotes = async () => {
        try {
            const response = await axios.get(API_BASE_URL+"/quotes/getQuotes", {
                headers : {
                    "Authorization" : "Bearer " + localStorage.getItem("token")
                }
            })
            const newQuotes = response.data.map(item => {
                return {text: item.text, author: item.author}
            })

            setQuotes(newQuotes)
        } catch (error) {
            if (error.response?.status === 401) navigate("/sign-in")
        }
    }

    const addQuote = async ({text, author}) => {
        const quoteAdded = await createQuote({text, author})
        await getQuotes()
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Toaster />
            <div className="p-6 space-y-6">
                <Topbar></Topbar>
                <QuoteField addQuote={addQuote} />
                <QuoteCard quotes={quotes} />
            </div>

        </div>
    );
}

export default Home