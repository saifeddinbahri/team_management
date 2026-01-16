'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.set({
    name: 'auth',
    value: '',
    httpOnly: true,
    path:'/',
    maxAge: 0
  });

  cookieStore.set({
    name: 'role',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: 0
  });

  redirect('/login');
}
