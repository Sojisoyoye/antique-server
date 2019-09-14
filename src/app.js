import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import cors from 'cors';
import env from 'dotenv';
import bodyParser from 'body-parser';

import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import models from './models';
import { checkSignIn } from './graphql/middleware';


env.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: error => {
        const message = error.message
            .replace('SequelizeValidationError: ', '')
            .replace('Validation error: ', '');
        
        return {
            ...error,
            message,
        }
    },
    context: async ({ req }) => {

        const signedInCustomer = await checkSignIn(req);

        return {
            models,
            signedInCustomer,
        }
    },
});

server.applyMiddleware({ app, path: '/graphql' });

app.get('/', (req, res) => {
    return res.status(200).send({ 'message': 'Welcome to Antique™ World 🌍' });
});

app.all('*', (req, res) => res.status(404).send({
    status: 'error',
    message: 'This route does not exist'
}));

models.sequelize.authenticate();
models.sequelize.sync({ force: false })
//     .then(async () => {
//     createUsersWithMessages(); 
// })

app.listen({ port: 3000 }, () => {
    console.log('Apollo Server on http://localhost:3000/graphql');
});

// const createUsersWithMessages = async () => {
//     await models.Customer.create(
//         {
//             username: 'Omoba',
//             messages: [
//                 {
//                     text: 'Published the Road to learn React',
//                 },
//             ],
//         },
//         {
//             include: [models.Message],
//         },
//     );
//     await models.Customer.create(
//         {
//             username: 'Aji',
//             messages: [
//                 {
//                     text: 'Happy to release ...',
//                 },
//                 {
//                     text: 'Published a complete ...',
//                 },
//             ],
//         },
//         {
//             include: [models.Message],
//         },
//     );
// }
