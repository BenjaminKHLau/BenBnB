"use strict";

// const { Spot } = require("../models");

const spots = [
  {
    address: '69 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764797, 
    lng: -73.973149,
    name: 'Grand Army Plaza',
    description: 'Right by Central Park',
    price: 5000,
    ownerId: 1
  },
  {
    address: '404 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764794, 
    lng: -73.973144,
    name: 'Grand Army Plaza 2',
    description: 'Right by Central Park 2',
    price: 50000,
    ownerId: 1
  },
  {
    address: '6969 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764795, 
    lng: -73.973145,
    name: 'Grand Army Plaza 3',
    description: 'Right by Central Park 3',
    price: 50,
    ownerId: 1
  },
  {
    address: '3 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764796, 
    lng: -73.973146,
    name: 'Grand Army Plaza 4',
    description: 'Right by Central Park 4',
    price: 5,
    ownerId: 1
  },
  {
    address: '888 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764700, 
    lng: -73.973147,
    name: 'Grand Army Plaza 5',
    description: 'Right by Central Park 5',
    price: 50005,
    ownerId: 1
  },
 
  
]


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
    await queryInterface.bulkInsert('Spots', spots);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Spots', spots, {});
  },
};
