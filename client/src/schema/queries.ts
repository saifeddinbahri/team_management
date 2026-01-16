export const GET_TEAM = `
query GetTeam($id: ID!) {
    getTeam(id: $id) {
          id,
          name,
          description,
          users { email }
    }
}
`;

export const GET_ALL_TEAMS = `
    query {
        getAllTeams {
            id,
            name,
            description,
            users { email }
        }
    }
`;

export const GET_CURRENT_USER = `
    query {
        getCurrentUser {
            email,
            team {id}
        }
    }
`;

export const GET_ALL_USERS = `
    query {
        getAllUsers {
            id,
            email,
            role,
            team {id}
        }
    }
`;


