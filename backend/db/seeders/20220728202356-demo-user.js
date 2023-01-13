'use strict';
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'Lition',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ben',
        lastName: 'Lau',
        email: 'Ben@user.io',
        username: 'Ben',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Naruto',
        lastName: 'Uzumaki',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'John',
        lastName: 'Cena',
        email: 'JohnCena@youcantseeme.com',
        username: 'JohnCena',
        hashedPassword: bcrypt.hashSync('youcantseeme')
      },
      {
        firstName: 'Sasuke',
        lastName: 'Uchiha',
        email: 'SasukeUchiha@naruto.com',
        username: 'SasukeUchiha',
        hashedPassword: bcrypt.hashSync('Narutosucks')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'JohnCena', 'SasukeUchiha'] }
    }, {});
  }
};