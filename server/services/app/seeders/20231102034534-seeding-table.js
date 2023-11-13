'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const user = require('../user.json').map(el => {
      el.updatedAt = el.createdAt = new Date()
      return el
    })

    const genre = require('../genres.json').map(el => {
      el.updatedAt = el.createdAt = new Date()
      delete el.id
      return el
    })

    const movie = require('../movie.json').map(el => {
      el.updatedAt = el.createdAt = new Date()
      delete el.id
      return el
    })

    await queryInterface.bulkInsert('Users', user, {})
    await queryInterface.bulkInsert('Genres', genre, {})
    await queryInterface.bulkInsert('Movies', movie, {})

  },


  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movies', null, {});
    await queryInterface.bulkDelete('Genres', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};