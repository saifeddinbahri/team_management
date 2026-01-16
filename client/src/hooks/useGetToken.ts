import getAuthToken from "@/actions/get-auth-token";
import { useEffect, useState } from "react";

export default function useGetToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const getToken = async () => {
      setToken(await getAuthToken());
    }

    getToken();
  }, [])
  return token;
}