import { gql } from 'apollo-boost';

const GET_ALL_TRAINEE = gql`
query getAllTrainee($skip: Int, $limit: Int) {
getAllTrainee(skip: $skip, limit: $limit) {
    count
    records {
      name
      email
      createdAt
    }
  } 
}
`;

export default GET_ALL_TRAINEE;
