import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/storecontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { closeImg} from '../utils';

const LoginForm = ({ setShowLogin }) => {
    const { setToken, url,loadCartData } = useContext(StoreContext)
    const [currState, setCurrState] = useState("Sign Up");

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const onLogin = async (e) => {
        e.preventDefault()

        let new_url = url;
        if (currState === "Login") {
            new_url += "/api/user/login";
        }
        else {
            new_url += "/api/user/register"
        }
        const response = await axios.post(new_url, data);
        if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem("token", response.data.token)
            loadCartData({token:response.data.token})
            setShowLogin(false)
        }
        else {
            toast.error(response.data.message)
        }
    }

    return (
        <div className="fixed inset-0 text-black bg-black bg-opacity-50 flex items-center justify-center p-4 backdrop-blur-sm z-50">
            <form onSubmit={onLogin} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="px-8 pt-8 pb-6 relative">
                    <button
                        type="button"
                        onClick={() => setShowLogin(false)}
                        className="absolute top-4 right-4 p-2 hover:scale-125 rounded-full transition-colors"
                    >
                        <img src={closeImg} alt="Close" className="w-5 h-5 opacity-1" />
                    </button>

                    <h2 className="text-2xl font-bold mb-8 text-gray-800">{currState}</h2>

                    <div className="space-y-5">
                        {currState === "Sign Up" && (
                            <div>
                                <input
                                    name="name"
                                    value={data.name}
                                    onChange={onChangeHandler}
                                    placeholder="Your name"
                                    required
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                        )}

                        <div>
                            <input
                                name="email"
                                type="email"
                                value={data.email}
                                onChange={onChangeHandler}
                                placeholder="Your email"
                                required
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div>
                            <input
                                name="password"
                                type="password"
                                value={data.password}
                                onChange={onChangeHandler}
                                placeholder="Password"
                                required
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black text-white py-3.5 rounded-full  hover:bg-transparent border border-transparent hover:border hover:text-black hover:border-black transition-colors mt-6"
                    >
                        {currState === "Login" ? "Sign In" : "Create Account"}
                    </button>

                    <div className="mt-6 flex items-center space-x-2">
                        <input
                            type="checkbox"
                            required
                            className="w-4 h-4 border rounded accent-black"
                        />
                        <p className="text-sm text-gray-500">
                            By continuing, I agree to the terms of use & privacy policy.
                        </p>
                    </div>

                    <p className="text-center mt-6 text-gray-600">
                        {currState === "Login" ? (
                            <>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setCurrState('Sign Up')}
                                    className="text-sky-500 underline hover:text-sky-600  font-medium"
                                >
                                    Sign Up
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => setCurrState('Login')}
                                    className="text-sky-500 underline hover:text-sky-600  font-medium"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;
