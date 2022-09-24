'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
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
        username: 'BenL',
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
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'JohnCena', 'SasukeUchiha'] }
    }, {});
  }
};