'use server'
import { cookies } from "next/headers";

export default async function getUserRole(): Promise<string | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('role');
  if (authCookie) {
    return authCookie.value;
  }
  return null;
} 