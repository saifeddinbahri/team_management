'use server'
import { cookies } from "next/headers";

export default async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('auth');
  if (authCookie) {
    return authCookie.value;
  }
  return null;
} 