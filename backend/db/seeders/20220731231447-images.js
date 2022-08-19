"use strict";

const images = [
  {
    userId: 1,
    spotId: 1,
    reviewId: 1,
    previewImage: true,
    url: "centralpark1",
  },
  {
    userId: 2,
    spotId: 2,
    reviewId: 2,
    previewImage: true,
    url: "centralpark2",
  },
  {
    userId: 3,
    spotId: 3,
    reviewId: 3,
    previewImage: true,
    url: "centralpark3",
  },
  {
    userId: 4,
    spotId: 4,
    reviewId: 4,
    previewImage: true,
    url: "centralpark4",
  },
  {
    userId: 5,
    spotId: 5,
    reviewId: 5,
    previewImage: true,
    url: "centralpark5",
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
    await queryInterface.bulkInsert("Images", images);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Images", images);
  },
};
