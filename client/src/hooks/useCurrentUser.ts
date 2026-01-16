import { useEffect, useState } from "react";
import useGetToken from "./useGetToken";
import { GET_CURRENT_USER } from "@/schema/queries";

interface User {
  email: string;
  team?: Team;
}

interface Team {
  id: string;
}

export default function useCurrentUser() {
  const token = useGetToken();
  const [user, setUser] = useState<User>({email: 'Unkown'});

  useEffect(() => {
    const getTeams = async () => {
      const gqlAPI = process.env.NEXT_PUBLIC_API;
            if (gqlAPI && token) {
              const response = await fetch(gqlAPI, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    query: GET_CURRENT_USER,
                }),
              });
      
              const resBody = await response.json();
              if (Reflect.has(resBody, 'errors')) {
                console.log(resBody.errors)
              } else {
                setUser(resBody.data.getCurrentUser)
              }
            } 
    }
    
    getTeams();
  }, [token])

  return { user, setUser };
}