'use client'
import getAuthToken from "@/actions/get-auth-token";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoadTeams from "@/hooks/useLoadTeams";
import { CREATE_TEAM, DELETE_TEAM, UPDATE_TEAM } from "@/schema/mutations";
import { loadTeams, Team } from "@/utils/loadTeams";
import { useState } from "react";

export default function Teams() {
  const { teams, setTeams } = useLoadTeams();
  const { user } = useCurrentUser();
  const [isOpen, setIsOpen] = useState({open: false, action: ''});
  const [editTeam, setEditTeam] = useState<Team>({id: '', name: '', description: ''} as Team)
  const [error, setError] = useState<string | null>(null);
  


  const handleTeam = async (action: string) => {
    const token = await getAuthToken();
    const gqlAPI = process.env.NEXT_PUBLIC_API;
    let query = UPDATE_TEAM;
    let variables: {name?: string, description?: string, id?: string} = {
      name: editTeam.name, 
      description: editTeam.description, 
      id: editTeam.id
    };

    if (action === 'create') {
      query = CREATE_TEAM
      variables = { name: editTeam.name, description: editTeam.description }
    } else if (action === 'delete') {
      query = DELETE_TEAM
      variables = { id: editTeam.id }
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
        setTeams(await loadTeams());
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{isOpen.action === 'create' ? 'Add team' : 'Update team'}</h2>
          <div className={`text-red-500 text-center ${error ? '' : 'hidden'}`}>{error}</div>
          <div className="space-y-4">
          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
              onChange={(e) => {setEditTeam(curr => ({...curr, name: e.target.value}))}}
              type="text"
              value={editTeam.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Team name"
              />
          </div>

          <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input 
              onChange={(e) => {setEditTeam(curr => ({...curr, description: e.target.value}))}}
              value={editTeam.description}
              type="text" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Team description"
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
            Add team
      </button>  
      </div>
          <div className="m-2 space-y-2">
            {
              teams.map((team) => (
                <div
                  key={team.id}
                  className={`group flex flex-col gap-2 rounded-lg p-5 text-black bg-gray-50`}
                  tabIndex={1}
                  >
                  <div className="flex cursor-pointer items-center justify-between">
                    <span> {team.name} </span>
                    <span onClick={() => { setIsOpen({open: true, action: 'edit'}); setEditTeam(team) }} className="font-semibold">Edit</span>
                  </div>
                  <div className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000">
                      <div className="font-medium">
                        Description
                      </div>
                      <div className="pl-5">
                        {team.description}
                      </div>
                      <div className="font-medium">
                        Users
                      </div>
                      <div className="flex flex-col pl-5">
                        {
                          team.users.map((user) => (
                            <div key={user.email}> {user.email} </div>
                          ))
                        }
                      </div>
                  </div>
            </div>
              ))
            }
            
          </div>
  
      </div>
        </> 
      );
}