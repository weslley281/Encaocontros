import { Sequelize } from 'sequelize';

const connection = new Sequelize(
  'encaocontros',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql',
    // pool: {
    //   max: 5,
    //   min: 0,
    //   idle: 10000,
    // },
    // dialectOptions: {
    //   encrypt: true,
    //   ssl: {
    //     ca: require('fs').readFileSync(
    //       '../../utils/DigiCertGlobalRootCA.crt.pem'
    //     ),
    //   },
    // },
  }
);

async function createConnectionDataBase() {
  try {
    await connection.authenticate();
    console.log('*******Conexão feita no banco de dados!*******');
  } catch (error) {
    console.error('Erro ao se conectar ao banco de dados: ', error);
  }
}

export { connection, createConnectionDataBase };