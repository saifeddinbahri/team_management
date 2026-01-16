'use client'
import getAuthToken from "@/actions/get-auth-token";
import useCurrentUser from "@/hooks/useCurrentUser";
import { UPDATE_PROFILE } from "@/schema/mutations";
import { useState } from "react";

export default function Profile() {
      const { user, setUser } = useCurrentUser();
      const [password, setPassword] = useState<string>();
      const [error, setError] = useState<string | null>(null);
      const [message, setMessage] = useState<string | null>(null);

      const handleVariables = () => {
        if (password && password.length > 7) {
            return { email: user.email, password: password }
        }
        return { email: user.email };
      }

      const updateProfile = async () => {
        setError(null);
        setMessage(null);
        const token = await getAuthToken();
        const gqlAPI = process.env.NEXT_PUBLIC_API;
        if (gqlAPI) {
          const response = await fetch(gqlAPI, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query: UPDATE_PROFILE,
                variables: handleVariables()
            })
          })
          const resBody = await response.json();
          if (Reflect.has(resBody, 'errors')) {
            console.log(resBody.errors)
            setError('Failed to update profile');
          } else {
            console.log(resBody.data)
            setMessage('Profile updated successfully')
          }
          
        }
      }

  return (
<div className="min-h-screen bg-gray-100 flex pl-60 items-center justify-center p-4">
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Profile</h2>
        <div className={`text-red-500 text-center ${error ? '' : 'hidden'}`}>{error}</div>
        <div className={`text-green-500 text-center ${message ? '' : 'hidden'}`}>{message}</div>
        <div className="space-y-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
             onChange={(e) => {setUser({email: e.target.value})}} 
            type="email"
            value={user.email}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="your@email.com"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
            onChange={(e) => {setPassword(e.target.value)}}
            type="password" 
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            placeholder="••••••••"
            />
        </div>


        <button onClick={updateProfile} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Update
        </button>
        </div>

    </div>
    </div>
  )
}