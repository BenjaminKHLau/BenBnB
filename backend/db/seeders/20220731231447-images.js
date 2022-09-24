"use strict";

const images = [
  {
    userId: 1,
    spotId: 1,
    reviewId: 1,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/miso/Hosting-641209676540364525/original/0f12e818-046e-4eba-aeff-2a41b052749f.jpeg?im_w=1200",
  },
  {
    userId: 2,
    spotId: 2,
    reviewId: 2,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/2744ae60-b58c-4546-851c-b4658f0f60cc.jpg",
  },
  {
    userId: 3,
    spotId: 3,
    reviewId: 3,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/196d4c33-74b8-45d0-8eea-b1b7eca186dc.jpg",
  },
  {
    userId: 4,
    spotId: 4,
    reviewId: 4,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/69fd1d65-c1d9-41f4-9714-d299cc619a63.jpg",
  },
  {
    userId: 5,
    spotId: 5,
    reviewId: 5,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/19f0ab09-9036-4af1-9b77-2f09800ae260.jpg",
  },
  {
    userId: 1,
    spotId: 6,
    reviewId: 6,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/ca9b9647-07c6-4a51-a79a-771ef6d579ea.jpg",
  },
  {
    userId: 2,
    spotId: 7,
    reviewId: 7,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49477035/original/ecd0424b-274e-4ae0-966f-60706c54bc44.jpeg",
  },
  {
    userId: 3,
    spotId: 8,
    reviewId: 8,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49477035/original/2979ec87-04b0-461c-96e3-e6ea9928fc2d.jpeg",
  },
  {
    userId: 4,
    spotId: 9,
    reviewId: 9,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/689aaf49-4100-4578-9f02-de68c570e999.jpg?im_w=1440",
  },
  {
    userId: 5,
    spotId: 10,
    reviewId: 10,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/d6ebce96-2575-49e4-b162-9d5d468d2bb3.jpg?im_w=1200",
  },
  {
    userId: 5,
    spotId: 11,
    reviewId: 11,
    previewImage: true,
    url: "https://a0.muscache.com/im/pictures/prohost-api/Hosting-49477035/original/2979ec87-04b0-461c-96e3-e6ea9928fc2d.jpeg?im_w=1440",
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
