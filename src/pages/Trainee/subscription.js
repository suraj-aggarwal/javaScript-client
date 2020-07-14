import { gql } from 'apollo-boost';

const ADD_TRAINEE_SUB = gql`
subscription  ADD_SUBSCRIPTION {
  addTrainee {
    name
    email
    role
    email
    createdAt
  }
}
`;

const UPDATE_TRAINEE_SUB = gql`
subscription UPDATE_TRAINEE_SUB {
  updateTrainee
  {
    name
    email
    originalId
  }
}
`;

const DELETE_TRAINEE_SUB = gql`
subscription {
  deleteTrainee
}
`;

export { ADD_TRAINEE_SUB, UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB };
