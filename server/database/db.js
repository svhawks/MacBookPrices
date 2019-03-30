const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const db = {};
const sequelize = new Sequelize("MacWorld", "root", "root", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  tableName: "macs",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false
  },
  $between: Op.between
})
db.sequelize = sequelize;
db.Sequelize = Sequelize;
sequelize
		.authenticate()
		.then(() => {
			console.log('Connection has been established successfully.');
		})
		.catch((err) => {
			console.log('Unable to connect to the database:', err);
		})
module.exports = db;
