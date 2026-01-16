import { loadUsers, User } from "@/utils/loadUsers";
import { useEffect, useState } from "react";


export default function useLoadUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const getUsers = async () => {
      setUsers(await loadUsers())
    }
    
    getUsers();
  }, [])

  return { users, setUsers };
}