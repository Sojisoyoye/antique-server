import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';
import { createToken, validatePassword } from '../../helpers';
import { isAdmin } from './authorization';

export default {
    Query: {
        customers: async (parent, args, { models }) => {
            return await models.Customer.findAll();
        },
        customer: async (parent, { id }, { models }) => {
            return await models.Customer.findByPk(id);
        },
        signedInCustomer: async (parent, args, { models, signedInCustomer }) => {
            return await models.Customer.findByPk(signedInCustomer.id);
        },
    },

    Mutation: {
        signUp: async (parent, { username, email, password }, { models }) => {
            try {
                const customer = await models.Customer.create({
                    username,
                    email,
                    password,
                });
                
                const { id, role } = customer;
                
                const token = createToken(id, role);
                
                return token;
            } catch (error) {
                throw new Error(error);
            }
        },

        signIn: async (parent, { login, password }, { models }) => {
            const customer = await models.Customer.findByLogin(login);

            if (!customer) {
                throw new UserInputError('No user with these credentials');
            };

            const validPassword = validatePassword(password);

            if (!validPassword) {
                throw new AuthenticationError('Invalid password');
            };

            const { id } = customer;

            const token = createToken(id);

            return token;
        },

        deleteCustomer: combineResolvers(
            isAdmin,
            async (parent, { id }, { models }) => {
                return await models.Customer.destroy({
                    where: { id },
                });
            },
        ),
    },

    Customer: {
        messages: async (customer, args, { models }) => {
            return await models.Message.findAll({
                where: {
                    customerId: customer.id
                }
            })
        },
    },
};

