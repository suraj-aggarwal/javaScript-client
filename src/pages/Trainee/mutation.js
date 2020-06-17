import { gql } from 'apollo-boost';

const DELETE_TRAINEE = gql`
mutation DELETE_USER($id: ID!) {
  deleteUser(id: $id)
}
`;

export default DELETE_TRAINEE;
