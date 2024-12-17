import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

const petModel = connection.define('pets', {
  pet_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  animal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  breed: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  vaccination_status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  health_conditions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pedigree: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

function createTablePets() {
  return petModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de pets criada com sucesso*******');
  });
}

export { petModel, createTablePets };
