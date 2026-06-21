import { useState } from 'react'

const QuoteField = ({addQuote}) => {
    const [text, setText]  = useState("")
    const [author, setAuthor] = useState("")
    const handleQuote = () => {
        if (text.trim() !== "" && author.trim() !== ""){
            addQuote({text: text, author: author})
            setText("")
            setAuthor("")
        }
    }
    return (
    <div className='flex flex-row gap-12'>
        <div className='flex flex-col gap-5'>
            <input 
                type="text"
                placeholder='Your Quote...(" " or &#39; &#39; are not required)'
                value={text}
                onChange={(e) => setText(e.target.value)}
                className='
                w-150
                px-6
                py-2
                bg-gray-800
                border-b
                border-gray-300
                '
            />
            <input 
                type="text"
                placeholder='Your Name...'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="
                w-150
                px-6
                py-2
                bg-gray-800
                border-b
                border-gray-300
                "
            />
        </div>
        <button type='submit' onClick={handleQuote} className='px-6 py-3 bg-gray-800 text-white font-medium rounded-lg shadow hover:bg-gray-700  transition-colors duration-200'>
            Submit Quote
        </button>
    </div>
    )
}

export default QuoteField