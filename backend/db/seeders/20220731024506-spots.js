"use strict";

// const { Spot } = require("../models");

const spots = [
  {
    address: '69 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764797, 
    lng: 73.973149,
    name: 'Grand Army Plaza',
    description: 'Right by Central Park',
    price: 5000,
    ownerId: 3
  },
  {
    address: '404 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764794, 
    lng: 73.973144,
    name: 'Grand Army Plaza 2',
    description: 'Right by Central Park 2',
    price: 50000,
    ownerId: 2
  },
  {
    address: '6969 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764795, 
    lng: 73.973145,
    name: 'Grand Army Plaza 3',
    description: 'Right by Central Park 3',
    price: 50,
    ownerId: 5
  },
  {
    address: '3 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764796, 
    lng: 73.973146,
    name: 'Grand Army Plaza 4',
    description: 'Right by Central Park 4',
    price: 5,
    ownerId: 3
  },
  {
    address: '888 New York Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764700, 
    lng: 73.973147,
    name: 'Grand Army Plaza 5',
    description: 'Right by Central Park 5',
    price: 50005,
    ownerId: 2
  },
  {
    address: '599 Broadway',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.744700, 
    lng: 73.943147,
    name: 'WeWork',
    description: 'Houston and Broadway corner',
    price: 3500,
    ownerId: 2
  },
  {
    address: '505 Park Ave',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.764500, 
    lng: 73.973047,
    name: 'WeWork Park Ave',
    description: 'Corner building on Park Ave and East 60th St',
    price: 7000,
    ownerId: 3
  },
  {
    address: '35 East 21st St',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.769700, 
    lng: 73.979147,
    name: 'WeWork FlatIron',
    description: 'Between Broadway and Park Ave',
    price: 4500,
    ownerId: 4
  },
  {
    address: '1881 Broadway',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.864700, 
    lng: 73.073147,
    name: 'AAA Building',
    description: 'Upper West Side on West 62nd St',
    price: 7999,
    ownerId: 5
  },
  {
    address: '28 West 44th St',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.774700, 
    lng: 73.983147,
    name: 'Club Row Building',
    description: 'Between Avenue of Americas and 5th Ave',
    price: 9500,
    ownerId: 3
  },
  {
    address: '620 Avenue of the Americas',
    city: 'New York',
    state: 'New York',
    country: 'USA',
    lat: 40.774595, 
    lng: 73.233147,
    name: 'WeWork Corporate HQ',
    description: 'Corner of 6th ave and West 18th St',
    price: 1500,
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
