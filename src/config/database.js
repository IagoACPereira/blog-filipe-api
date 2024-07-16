const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.HOSTDB,
  port: process.env.PORTADB,
  database: process.env.DATABASE,
  username: process.env.USUARIODB,
  password: process.env.SENHADB,
  dialect: process.env.DIALETODB,
});

try {
  sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.log('Conexão com o banco ok.');
} catch(_) {
  console.log('Conexão com o banco nok.');
}

module.exports = sequelize;
