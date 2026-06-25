import { useState } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'

const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col gap-5 justify-center items-center">
                 <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                    Log in to your account
                </h2>
                <p className="text-light-3 small-medium md:base-regular mt-2">
                    Welcome back! Please enter your details.
                </p>
                <input 
                    type="email"
                    placeholder='Your Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='
                    w-96
                    px-6
                    py-2
                    bg-gray-800
                    border-b
                    border-gray-300
                    '
                />
                <input 
                    type="password"
                    placeholder='Your Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                    w-96
                    px-6
                    py-2
                    bg-gray-800
                    border-b
                    border-gray-300
                    "
                />
                <button type='submit' onClick={() => {setEmail("gettrolled")}} className='px-6 py-3 bg-gray-800 text-white font-medium rounded-lg shadow hover:bg-gray-700  transition-colors duration-200'>
                    Sign In
                </button>

                <p className="text-small-regular text-light-2 text-center mt-2">
                Don't have an account?
                <Link
                    to="/sign-up"
                    className="text-primary-500 text-small-semibold ml-1 text-blue-500">
                    Sign Up
                </Link>
                </p>
        </div>
    )
}

export default SignUp