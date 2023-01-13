"use strict";
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const bookings = [
  {
    userId: 1,
    spotId: 1,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-01-07"),
  },
  {
    userId: 2,
    spotId: 2,
    startDate: new Date("2022-10-04"),
    endDate: new Date("2022-10-06"),
  },
  {
    userId: 3,
    spotId: 3,
    startDate: new Date("2022-09-11"),
    endDate: new Date("2022-09-15"),
  },
  {
    userId: 4,
    spotId: 4,
    startDate: new Date("2022-03-14"),
    endDate: new Date("2022-03-20"),
  },
  {
    userId: 5,
    spotId: 5,
    startDate: new Date("2022-04-20"),
    endDate: new Date("2022-04-22"),
  },
];

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
     await queryInterface.bulkInsert(options, bookings)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, bookings)
  },
};
