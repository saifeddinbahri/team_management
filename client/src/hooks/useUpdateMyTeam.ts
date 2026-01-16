import { useEffect, useState } from "react";
import useGetToken from "./useGetToken";

interface User {
  email: string;
  team?: Team;
}

interface Team {
  id: string;
}

export default function useUpdateMyTeam(mutation: string) {
  const token = useGetToken();
  const [user, setUser] = useState<User>();

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
                    query: mutation,
                }),
              });
      
              const resBody = await response.json();
              if (Reflect.has(resBody, 'errors')) {
                console.log(resBody.errors)
                setUser({email: "Unkown"})
              } else {
                console.log(resBody)
                setUser(resBody.data.getCurrentUser)
              }
            } else {
                setUser({email: "Unkown"})
            }
    }
    
    getTeams();
  }, [token])

  return user;
}