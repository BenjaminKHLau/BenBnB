'use strict';


const reviews = [
  {
    userId: 4,
    spotId: 3,
    review: 'The floor was lava',
    stars: 5
  },
  {
    userId: 1,
    spotId: 2,
    review: 'The park benches had a homeless guy sleeping',
    stars: 1
  },
  {
    userId: 3,
    spotId: 1,
    review: 'The New York natives cursed me out for walking so slow',
    stars: 5
  },
  {
    userId: 2,
    spotId: 5,
    review: 'The NYC pizza rat stole my purse and bought pizza with my credit card. Not even mad',
    stars: 4
  },
  {
    userId: 5,
    spotId: 4,
    review: 'I was robbed at gunpoint while taking pictures of Central Park',
    stars: 1
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Reviews', reviews)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Reviews', reviews)
  }
};
