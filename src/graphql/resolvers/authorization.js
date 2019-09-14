import { ForbiddenError } from 'apollo-server';
import { skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { signedInCustomer }) => 
    signedInCustomer ? skip : new ForbiddenError('Not authenticated as user.');

export const isPermitted = async (parent, { id }, { models, signedInCustomer }) => {
    const message = await models.Message.findByPk(id, { raw: true });
    
    if (message.customerId !== signedInCustomer.id) {
        throw new ForbiddenError('Not authenticated as owner.');
    }
    return skip;
};

export const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { signedInCustomer: { role } }) =>
    role === 'ADMIN'
      ? skip
      : new ForbiddenError('Not authorized as admin.'),
);