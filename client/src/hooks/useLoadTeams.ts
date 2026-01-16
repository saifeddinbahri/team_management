import { useEffect, useState } from "react";
import { loadTeams, Team } from "@/utils/loadTeams";

export default function useLoadTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  useEffect(() => {
    const getTeams = async () => {
      setTeams(await loadTeams())
    }
    
    getTeams();
  }, [])

  return { teams, setTeams };
}