'use client'
import getAuthToken from "@/actions/get-auth-token";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoadUsers from "@/hooks/useLoadUsers";
import { DELETE_USER, REGISTER_MUTATION, UPDATE_USER_ADMIN } from "@/schema/mutations";
import { loadUsers, User } from "@/utils/loadUsers";
import { useState } from "react";


export default function Users() {
  const { users, setUsers } = useLoadUsers();
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState({open: false, action: ''});
  const [editUser, setEditUser] = useState<User>({id: '', email: '', role: '', team: {id: ''}})
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>('')


  const handleTeam = async (action: string) => {
    const token = await getAuthToken();
    setPassword('');
    const gqlAPI = process.env.NEXT_PUBLIC_API;
    let query = UPDATE_USER_ADMIN;
    let variables: { 
      email?: string, 
      role?: string, 
      id?: string, 
      team?: string, 
      password?: string } = {
      email: editUser.email, 
      role: editUser.role, 
      id: editUser.id,
    };

    if (password && password.length > 7) {
      variables.password = password;
    }

    if (action === 'create') {
      query = REGISTER_MUTATION
      variables = {
        email: editUser.email, 
        role: editUser.role, 
        password: password,
      };
      } else if (action === 'delete') {
      query = DELETE_USER
      variables = { id: editUser.id }
    }
    if (gqlAPI) {
      const response = await fetch(gqlAPI, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            query,
            variables
        })
      })
      const resBody = await response.json();
      if (Reflect.has(resBody, 'errors')) {
        console.log(resBody.errors)
        setError('Failed to update profile');
      } else {
        console.log(resBody.data)
        setUsers(await loadUsers());
        setError(null);
        setIsOpen({open: false, action: ''})
      }
      
    }

  }
  
      return (
        <>
              <div className={`fixed inset-0 w-full h-full bg-black/65 flex items-center justify-center p-4 z-[70] ${isOpen.open ? 'flex' : 'hidden'}`}>  
        <div className={`max-w-md w-full bg-white rounded-xl shadow-lg p-8 relative`}>
        <button
          onClick={ () => {setIsOpen({open: false, action: ''})} }
          type="button"
          className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-transparent transition-colors duration-300 hover:bg-black/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{isOpen.action === 'create' ? 'Add user' : 'Update user'}</h2>
          <div className={`text-red-500 text-center ${error ? '' : 'hidden'}`}>{error}</div>
          <div className="space-y-4">
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
              onChange={(e) => {setEditUser(curr => ({...curr, email: e.target.value}))}}
              type="text"
              value={editUser.email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="email@example.com"
              />
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <select
              onChange={(e) => {setEditUser(curr => ({...curr, role: e.target.value}))}}
              value={editUser.role}
              className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
          </div>
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
              onChange={(e) => {setPassword(e.target.value)}}
              type="password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              />
          </div>

          <button onClick={() => { handleTeam(isOpen.action) }}  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
             {isOpen.action === 'create' ? 'Add' : 'Update'}
          </button>
          <button onClick={() => { handleTeam('delete') }}  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
             Delete
          </button>
          </div>
        </div> 

    </div>
            <div className = "fixed w-full z-30 flex bg-white  p-2 items-center justify-center h-16 px-10">
  
          <div className = "grow h-full flex items-center justify-center"></div>
          <div className = "flex-none h-full text-center flex items-center justify-center">
              
                  <div className = "flex space-x-3 items-center px-3">
                      <div className = "flex-none flex justify-center">
                      <div className="bg-gray-50 rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#999999">
                            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
                        </svg>                    
                      </div>
                      </div>
  
                      <div className = "hidden md:block text-sm md:text-md text-black ">{user?.email}</div>
                  </div>
                  
          </div>
      </div>
      <div className = "content ml-12 md:ml-60 transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ">
      <div className="flex flex-row justify-end">
      <button onClick={() => {setIsOpen({open: true, action: 'create'})}} className="m-2 w-48 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Add User
      </button>  
      </div>
          <div className="m-2 space-y-2">
            {
              users.map((user) => (
                <div
                  key={user.id}
                  className={` rounded-lg p-5 text-black bg-gray-50`}
                  tabIndex={1}
                  >
                  <div className="flex cursor-pointer items-center justify-between">
                    <span> {user.email} </span>
                    <span onClick={() => { setIsOpen({open: true, action: 'edit'}); setEditUser(user) }} className="font-semibold">Edit</span>
                  </div>
            </div>
              ))
            }
            
          </div>
  
      </div>
        </> 
      );
}