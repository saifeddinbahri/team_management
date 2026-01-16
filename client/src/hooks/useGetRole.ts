import getUserRole from "@/actions/get-role";
import { useEffect, useState } from "react";

export default function useGetRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getRole = async () => {
      const role = await getUserRole();
      setRole(role);
      setLoading(false);
    }

    getRole();
  }, [])
  return { role, loading };
}