'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface AuthData {
  token: string;
  role: string;
}

export default async function authenticateAction({ token, role }: AuthData) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'auth',
    value: token,
    httpOnly: true,
    path:'/',
  });

  cookieStore.set({
    name: 'role',
    value: role,
    httpOnly: true,
    path: '/',
  });

  redirect('/home');
}
