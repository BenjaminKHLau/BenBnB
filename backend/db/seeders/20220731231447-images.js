"use strict";

const images = [
  {
    userId: 1,
    spotId: 1,
    reviewId: 1,
    previewImage: true,
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Central_Park_-_The_Pond_%2848377220157%29.jpg/600px-Central_Park_-_The_Pond_%2848377220157%29.jpg",
  },
  {
    userId: 2,
    spotId: 2,
    reviewId: 2,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-city-central-park-1.jpg",
  },
  {
    userId: 3,
    spotId: 3,
    reviewId: 3,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-central-park-belvedere-castle.jpg",
  },
  {
    userId: 4,
    spotId: 4,
    reviewId: 4,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-central-park-bethesda-fountain.jpg",
  },
  {
    userId: 5,
    spotId: 5,
    reviewId: 5,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-central-park-conservatory-garden-fountain.jpg",
  },
  {
    userId: 1,
    spotId: 6,
    reviewId: 6,
    previewImage: true,
    url: "https://www.planetware.com/wpimages/2022/05/new-york-central-park-top-attractions-loeb-boathouse-on-the-lake.jpg",
  },
  {
    userId: 2,
    spotId: 7,
    reviewId: 7,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-city-central-park-the-mall.jpg",
  },
  {
    userId: 3,
    spotId: 8,
    reviewId: 8,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-central-park-conservatory-garden-fountain.jpg",
  },
  {
    userId: 4,
    spotId: 9,
    reviewId: 9,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-central-park-carousel.jpg",
  },
  {
    userId: 5,
    spotId: 10,
    reviewId: 10,
    previewImage: true,
    url: "https://www.planetware.com/photos-large/USNY/new-york-city-central-park-ice-skating.jpg",
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
