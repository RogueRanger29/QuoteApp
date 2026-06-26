import { useState, useEffect } from 'react'
import '../index.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast, Toaster } from 'sonner'
import { API_BASE_URL } from '../constants'
import { useNavigate } from 'react-router-dom'


const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
const SignUp = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("token") !== null){
                try {
                    const response = await axios.get(API_BASE_URL+"/auth/me", {
                        headers : {
                            "Authorization" : "Bearer " + localStorage.getItem("token")
                        }
                    })
                    
                    navigate("/")
                } catch (error) {
                    localStorage.clear()
                }
            }
            else{
                localStorage.clear()
            }
        }

        checkAuth()
    }, [])

    const handleSubmit = async () => {
        try {
            if (!validateEmail(email)){
                toast.error("Please use a valid email", { position: "top-center" })
                return
            }
            if (password.length < 8){
                toast.error("Password should be at least 8 characters long", { position: "top-center" })
                return
            }
            const payload  = {
                email: email,
                password: password
            }

            const response = await axios.post(API_BASE_URL+"/auth/sign-up", payload)

            if (response.status === 201){
                toast.success('Account Created!', { position: "top-center" })
            }
            
            localStorage.setItem("token", response.data.data.token)
            navigate("/")
        } catch(error){
            if (error.response?.status === 409) {
                toast.error("User Already Exists", { position: "top-center" })
            } else {
                toast.error("Something went wrong", { position: "top-center" })
            }
        }
    }


    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col gap-5 justify-center items-center">
            <Toaster />
            <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
                Create a new account
            </h2>
            <p className="text-light-3 small-medium md:base-regular mt-2">
                To use Quote's Up, Please enter your details
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
            <button type='submit' onClick={handleSubmit} className='px-6 py-3 bg-gray-800 text-white font-medium rounded-lg shadow hover:bg-gray-700  transition-colors duration-200'>
                Sign Up
            </button>

            <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account?
            <Link
                to="/sign-in"
                className="text-primary-500 text-small-semibold ml-1 text-blue-500">
                Sign in
            </Link>
            </p>
        </div>
    )
}

export default SignUp