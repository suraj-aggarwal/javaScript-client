import { gql } from 'apollo-boost';

const loginUser = gql`
mutation loginMutation($email: String!, $password: String!) {
     loginUser(loginCredentials: {email: $email, password: $password })
     } 
`;

export default loginUser;
