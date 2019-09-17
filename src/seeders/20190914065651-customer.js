'use strict';

const customers = [
  {
    username: 'John Doe',
    email: 'john@email.com',
    password: '123456',
    role: 'ADMIN'
  },
  {
    username: 'Janet Jane',
    email: 'janet@email.com',
    password: '123456'
  },
  {
    username: 'Sarah Sean',
    email: 'sarah@email.com',
    password: '123456'
  }
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Customers', [
      customers[0],
      customers[1],
      customers[2]
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Customers', null, {}); 
  }
};
