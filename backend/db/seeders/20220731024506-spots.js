"use strict";

// const { Spot } = require("../models");

const spots = [
  {
    address: '69 Pool St',
    city: 'Dallas',
    state: 'Texas',
    country: 'USA',
    lat: 40.764797, 
    lng: 73.973149,
    name: 'Dallas Lux',
    description: 'Beautiful Pool',
    price: 5000,
    ownerId: 3
  },
  {
    address: '404 Error St',
    city: 'Plano',
    state: 'Texas',
    country: 'USA',
    lat: 40.764794, 
    lng: 73.973144,
    name: 'Plano Resort',
    description: 'Resort in Plano',
    price: 50000,
    ownerId: 2
  },
  {
    address: '6969 New York Sucks Ave',
    city: 'Carrollton',
    state: 'Texas',
    country: 'USA',
    lat: 40.764795, 
    lng: 73.973145,
    name: 'Carrollton Residences',
    description: 'Carrollton Area',
    price: 50,
    ownerId: 5
  },
  {
    address: '3 Resort St',
    city: 'Anna',
    state: 'Texas',
    country: 'USA',
    lat: 40.764796, 
    lng: 73.973146,
    name: 'Anna Resort',
    description: 'Beautiful sunsets',
    price: 5,
    ownerId: 3
  },
  {
    address: '888 Hotel Ave',
    city: 'McKinney',
    state: 'Texas',
    country: 'USA',
    lat: 40.764700, 
    lng: 73.973147,
    name: 'McKinney Hotel',
    description: 'McKinney hotel',
    price: 50005,
    ownerId: 2
  },
  {
    address: '599 Broadway',
    city: 'Murphy',
    state: 'Texas',
    country: 'USA',
    lat: 40.744700, 
    lng: 73.943147,
    name: 'WeWork',
    description: 'Beautiful neighborhood',
    price: 3500,
    ownerId: 2
  },
  {
    address: '505 Park Ave',
    city: 'Celina',
    state: 'Texas',
    country: 'USA',
    lat: 40.764500, 
    lng: 73.973047,
    name: 'WeWork Park Ave',
    description: 'It is pronounced Sell-Line-Nah',
    price: 7000,
    ownerId: 3
  },
  {
    address: '35 East 21st St',
    city: 'Parker',
    state: 'Texas',
    country: 'USA',
    lat: 40.769700, 
    lng: 73.979147,
    name: 'WeWork FlatIron',
    description: 'Why do we have New York addresses?',
    price: 4500,
    ownerId: 4
  },
  {
    address: '1881 Broadway',
    city: 'Richardson',
    state: 'Texas',
    country: 'USA',
    lat: 40.864700, 
    lng: 73.073147,
    name: 'AAA Building',
    description: 'Definitely not a New York address',
    price: 7999,
    ownerId: 5
  },
  {
    address: '28 West 44th St',
    city: 'Sachse',
    state: 'Texas',
    country: 'USA',
    lat: 40.774700, 
    lng: 73.983147,
    name: 'Club Row Building',
    description: '"Sack-see", not "sexy", but I\'m not telling you what to do',
    price: 9500,
    ownerId: 3
  },
  {
    address: '620 Avenue of the Americas',
    city: 'Lucas',
    state: 'Texas',
    country: 'USA',
    lat: 40.774595, 
    lng: 73.233147,
    name: 'WeWork Corporate HQ',
    description: 'Lucas, I am your father... wait',
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
