import { gql } from 'apollo-boost';

const DELETE_TRAINEE = gql`
mutation DELETE_USER($id: ID!) {
  deleteUser(id: $id)
}
`;

const EDIT_TRAINEE = gql`
mutation EDIT_TRAINEE(
  $id: ID!, 
  $name: String,
  $role: String,
  $email: String,
)
  {
  updateUser(user: {
    id: $id,
    name: $name,
    email:$email,
    role: $role
  }) {
    name
    email
    originalId
  }
}
`;

const CREATE_TRAINEE = gql`
mutation CREATE_TRAINEE(
  $name: String!,
  $email: String!,
  $role: String,
  $password: String!,
) {
  createUser(user: {
    name: $name,
    email: $email,
    role: $role,
    password: $password,
  }) {
    name
    email
  }
}
`;

export { DELETE_TRAINEE, EDIT_TRAINEE, CREATE_TRAINEE };
