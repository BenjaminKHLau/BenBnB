"use strict";

const bookings = [
  {
    userId: 1,
    spotId: 1,
    startDate: "2023-01-01",
    endDate: "2023-01-07",
  },
  {
    userId: 2,
    spotId: 2,
    startDate: "2022-10-04",
    endDate: "2022-10-06",
  },
  {
    userId: 3,
    spotId: 3,
    startDate: "2022-09-11",
    endDate: "2022-09-15",
  },
  {
    userId: 4,
    spotId: 4,
    startDate: "2022-03-14",
    endDate: "2022-03-20",
  },
  {
    userId: 5,
    spotId: 5,
    startDate: "2022-04-20",
    endDate: "2022-04-22",
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
     await queryInterface.bulkInsert('Bookings', bookings)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Bookings', bookings)
  },
};
