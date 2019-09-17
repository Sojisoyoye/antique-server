import { gql } from 'apollo-server-express';

import userSchema from './customer';
import messageSchema from './message';

const linkSchema = gql`
type Query {
    _: Boolean
}

type Mutation {
    _: Boolean
}

type Subscription {
    _: Boolean
}
`;

export default [linkSchema, userSchema, messageSchema];

