'use client'
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoadTeams from "@/hooks/useLoadTeams";
import { JOIN_TEAM, LEAVE_TEAM } from "@/schema/mutations";
import { loadTeams } from "@/utils/loadTeams";
import { updateMyTeam } from "@/utils/updateMyTeam";

export default function Home() {
   const { teams, setTeams } = useLoadTeams();
      const { user, setUser } = useCurrentUser();
  
      const checkSameTeam = (id: string): boolean => {
        const team = user?.team;
        if (team && team.id === id) {
          return true;
        }
        return false;
      }
  
      const handleMyTeam = async (inTeam: boolean, teamId: string) => {
        if (inTeam) {
          setUser(await updateMyTeam(LEAVE_TEAM, teamId));
        } else {
          setUser(await updateMyTeam(JOIN_TEAM, teamId));
        }
        setTeams(await loadTeams())
      }
  
      return (
        <>
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
          <div className="m-2 space-y-2">
            {
              teams.map((team) => (
                <div
                  key={team.id}
                  className={`group flex flex-col gap-2 rounded-lg p-5 ${checkSameTeam(team.id) ? 'text-white bg-blue-400': 'text-black bg-gray-50'}`}
                  tabIndex={1}
                  >
                  <div className="flex cursor-pointer items-center justify-between">
                    <span> {team.name} </span>
                    <span onClick={() => { handleMyTeam(checkSameTeam(team.id), team.id) }} className="font-semibold">{checkSameTeam(team.id) ? 'Leave' : 'Join'}</span>
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