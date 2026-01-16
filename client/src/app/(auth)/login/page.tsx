'use client'
import authenticateAction from "@/actions/authenticate";
import { LOGIN_MUTATION } from "@/schema/mutations";
import { useState } from "react"

export default function Login() {
  const [formData, setFormData] = useState({email: "", password: ""})
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    console.log(formData);
    const gqlAPI = process.env.NEXT_PUBLIC_API;
    if (gqlAPI) {
      const response = await fetch(gqlAPI, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            query: LOGIN_MUTATION,
            variables: formData
        })
      })
      const resBody = await response.json();
      if (Reflect.has(resBody, 'errors')) {
        console.log(resBody.errors)
        setError('Incorrect credentials');
      } else {
        console.log(resBody.data)
        await authenticateAction(resBody.data.login)
      }
      
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h2>
        <div className={`text-red-500 text-center ${error ? '' : 'hidden'}`}>{error}</div>
        <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
             onChange={(e) => {setFormData(form => ({ ...form, email: e.target.value ?? '' }) )}} 
            type="email" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
            onChange={(e) => {setFormData(form => ({ ...form, password: e.target.value ?? '' }) )}}
            type="password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
            />
        </div>


        <button onClick={handleLogin} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Login
        </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
        Don&apos;t have an account? 
        <a href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium"> Sign up</a>
        </div>
    </div>
    </div>
  )
}