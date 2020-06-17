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
  })
}
`;

export { DELETE_TRAINEE, EDIT_TRAINEE };
