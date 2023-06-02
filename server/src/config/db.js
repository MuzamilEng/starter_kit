const { Sequelize } = require('sequelize')
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false,
})

testDbConnection = async () => {
  try {
    await sequelize.authenticate()

    sequelize.sync({ force: false, alter: false });

    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error(error)
  }
}

module.exports = { sq: sequelize, testDbConnection }