'use strict';

const messages = [
  {
    text: 'Introduction to GraphQl',
    CustomerId: 1
  },
  {
    text: 'Introduction to Node/Express Js with GraphQl',
    CustomerId: 1
  },
  {
    text: 'Life Long Learner',
    CustomerId: 2
  },
  {
    text: 'Reach for the Stars',
    CustomerId: 3
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
    return queryInterface.bulkInsert('Messages', [
      messages[0],
      messages[1],
      messages[2],
      messages[3]
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Messages', null, {});
  }
};
