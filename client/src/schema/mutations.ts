export const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!){
  login(email:$email password:$password) { token, role }
  }
`;

export const REGISTER_MUTATION = `
  mutation Register($email: String!, $password: String!){
  register(email:$email password:$password, role: USER) { token, role }
  }
`;

export const JOIN_TEAM = `
  mutation   JoinTeam($teamId: String!) {
    joinTeam(teamId: $teamId) {
      email,
      team {id}
    }
  }
`;

export const LEAVE_TEAM = `
  mutation {
    leaveTeam {
      email,
      team {id}
    }
  }
`;

export const UPDATE_PROFILE = `
  mutation UpdateUser($email: String!, $password: String){
    updateUser(email: $email, password: $password) {
      email,
    }
  }
`;

export const CREATE_TEAM = `
  mutation CreateTeam($name: String!, $description: String!){
    createTeam(name: $name, description: $description) {
      id,
      name,
      description
    }
  }
`;

export const UPDATE_TEAM = `
  mutation UpdateTeam($id: ID!, $name: String!, $description: String!){
    updateTeam(id: $id, name: $name, description: $description) {
      id,
      name,
      description
    }
  }
`;

export const DELETE_TEAM = `
  mutation DeleteTeam($id: ID!){
    deleteTeam(id: $id)
  }
`;

export const UPDATE_USER_ADMIN = `
  mutation UpdateUserAsAdmin($email: String!, $password: String, $id: ID!, $role: UserRole!){
    updateUserAsAdmin(email: $email, password: $password, id: $id, role: $role) {
      email,
    }
  }
`;

export const DELETE_USER = `
  mutation DeleteUser($id: String!){
    deleteUser(userId: $id)
  }
`;
