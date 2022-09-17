'use strict';


const reviews = [
  {
    userId: 4,
    spotId: 3,
    review: 'The floor was lava',
    stars: 5
  },
  {
    userId: 5,
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
  },
  {
    userId: 3,
    spotId: 6,
    review: 'Aliens were sleeping on my bed',
    stars: 2
  },
  {
    userId: 2,
    spotId: 7,
    review: 'The cars outside are making too much noise',
    stars: 1
  },
  {
    userId: 1,
    spotId: 8,
    review: 'Pigeons pooped on my head',
    stars: 3
  },
  {
    userId: 4,
    spotId: 9,
    review: 'The food gave me an allergy attack',
    stars: 1
  },
  {
    userId: 5,
    spotId: 10,
    review: 'The park smelled like horse poop everywhere',
    stars: 2
  },
  {
    userId: 2,
    spotId: 1,
    review: 'The toilets have poop stains on the seat',
    stars: 3
  },
  {
    userId: 4,
    spotId: 2,
    review: 'The cars outside are making too much noise',
    stars: 3
  },
  {
    userId: 3,
    spotId: 4,
    review: 'The room had a strong odor',
    stars: 2
  },
  {
    userId: 4,
    spotId: 5,
    review: 'I found bedbugs everywhere',
    stars: 1
  },
  {
    userId: 1,
    spotId: 10,
    review: 'Customer service was exceptionally bad',
    stars: 2
  },
  {
    userId: 2,
    spotId: 11,
    review: 'They had kombucha on tap',
    stars: 5
  },
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
