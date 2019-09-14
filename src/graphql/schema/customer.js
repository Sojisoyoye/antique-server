import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    customers: [Customer!]
    customer(id: ID!): Customer
    signedInCustomer: Customer
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    signIn(login: String!, password: String!): Token!
    deleteUser(id: ID!): Boolean!
  }

  type Token {
    token: String!
  }

  type Customer {
    id: ID!
    username: String!
    email: String!
    role: String!
    messages: [Message!]
  }
`;

