import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
//process.env.JWT_SECRET
const connection = new Sequelize(
  process.env.DB_NAME || 'encaocontros',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
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
