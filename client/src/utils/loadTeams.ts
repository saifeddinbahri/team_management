import getAuthToken from "@/actions/get-auth-token";
import { GET_ALL_TEAMS } from "@/schema/queries";

export interface User {
    email: string;
  }
  
export interface Team {
    id: string;
    name: string;
    description: string;
    users: User[]
  }
  
export async function loadTeams(): Promise<Team[]> {
    const token = await getAuthToken();
    const gqlAPI = process.env.NEXT_PUBLIC_API;
                if (gqlAPI && token) {
                  const response = await fetch(gqlAPI, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        query: GET_ALL_TEAMS,
                    }),
                  });
          
                  const resBody = await response.json();
                  if (Reflect.has(resBody, 'errors')) {
                    console.log(resBody.errors)
                    return [];
                  } else {
                    return resBody.data.getAllTeams;
                  }
                } else {
                   return [];
                }
}