import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

const userModel = connection.define('users', {
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_type: {
    type: DataTypes.ENUM('client', 'admin'),
    allowNull: false,
    unique: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

function createTableUser() {
  return userModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de cliente criada com sucesso*******');
  });
}

export { userModel, createTableUser };
