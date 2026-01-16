import getAuthToken from "@/actions/get-auth-token";
import { GET_ALL_USERS } from "@/schema/queries";

export interface User {
    email: string;
    role: string;
    team: { id: string },
    id: string;
  }
  
export async function loadUsers(): Promise<User[]> {
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
                        query: GET_ALL_USERS,
                    }),
                  });
          
                  const resBody = await response.json();
                  if (Reflect.has(resBody, 'errors')) {
                    console.log(resBody.errors)
                    return [];
                  } else {
                    return resBody.data.getAllUsers;
                  }
                } else {
                   return [];
                }
}