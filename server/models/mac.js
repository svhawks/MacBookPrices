const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
  "mac", 
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    model_identifier: {
      type: Sequelize.STRING
    },
    release_date: {
      type: Sequelize.STRING
    },
    processor: {
      type: Sequelize.STRING
    },
    processor_freq: {
      type: Sequelize.STRING
    },
    processor_cores: {
      type: Sequelize.INTEGER
    },
    processor_threads: {
      type: Sequelize.INTEGER
    },
    processor_count: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.FLOAT
    },
    single_score: {
      type: Sequelize.INTEGER
    },
    multi_score: {
      type: Sequelize.INTEGER
    }
})
