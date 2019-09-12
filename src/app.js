import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import cors from 'cors';
import env from 'dotenv';
import bodyParser from 'body-parser';

import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import models from './models/db';


env.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
        models,
        me: models.users[1],
    },
})

server.applyMiddleware({ app, path: '/graphql' });

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Welcome to Antique™ World 🌍' });
});

app.all('*', (req, res) => res.status(404).send({
    status: 'error',
    message: 'This route does not exist'
}));
  
app.listen({ port: 3000 }, () => {
    console.log('Apollo Server on http://localhost:3000/graphql');
})


