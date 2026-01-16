import getAuthToken from "@/actions/get-auth-token";
import { JOIN_TEAM } from "@/schema/mutations";

interface User {
    email: string;
    team?: Team;
  }
  
  interface Team {
    id: string;
  }

export async function updateMyTeam(mutation: string, teamId: string): Promise<User> {
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
            query: mutation,
            variables: {teamId}
        }),
      });

      const resBody = await response.json();
      if (Reflect.has(resBody, 'errors')) {
        console.log(resBody.errors)
        return {email: "Unkown"};
      } else {
        console.log(resBody)
        return mutation === JOIN_TEAM 
            ? resBody.data.joinTeam
            : resBody.data.leaveTeam;
      }
    } else {
        return {email: "Unkown"}
    }
}