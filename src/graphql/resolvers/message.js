import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isPermitted } from './authorization';

export default {
    Query: {
        messages: async (parent, args, { models }) => {
            return await models.Message.findAll();
        },

        message: async (parent, { id }, { models }) => {
            return await models.Message.findByPk(id);
        },
    },

    Mutation: {
        createMessage: combineResolvers(
            isAuthenticated,
            async (parent, { text }, { signedInCustomer, models }) => {
                try {
                    const message = await models.Message.create({
                        text,
                        CustomerId: signedInCustomer.id,
                    });
                    
                    return message;
                    
                } catch (error) {
                    throw new Error(error);
                };
            }
        ),

        updateMessage: combineResolvers(
            isAuthenticated,
            isPermitted,
            async (parent, { id, text }, { models }) => {
                try {
                    const message = await models.Message.findByPk(id)
                    const updatedMsg = await message.update({
                        text
                    })
                    
                    return updatedMsg;
                    
                } catch (error) {
                    throw new Error(error);
                }
            }
        ),
      
        deleteMessage: combineResolvers(
            isAuthenticated,
            isPermitted,
            async (parent, { id }, { models }) => {
                try {
                    return await models.Message.destroy({ where: { id } });
                } catch (error) {
                    throw new Error(error);
                }
            }
        ),
    },
    
    Message: {
        customer: async (message, args, { models }) => {
            return await models.Customer.findByPk(message.CustomerId);
        },
    },
};

