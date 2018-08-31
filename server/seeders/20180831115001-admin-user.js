
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('User', [{
    name: 'Lancemenot',
    password: 'LILorvyovZagNa6',
  }], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  },
};
