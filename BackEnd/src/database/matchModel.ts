import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

// Definindo os valores permitidos para o campo status
const matchStatusEnum = ['active', 'cancelled', 'pending', 'completed'];

const matchModel = connection.define('matches', {
  match_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user1_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao primeiro usuário ou dono de pet
  },
  user2_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao segundo usuário ou dono de pet
  },
  pet1_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao primeiro pet
  },
  pet2_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao segundo pet
  },
  status: {
    type: DataTypes.ENUM(...matchStatusEnum), // Definindo o campo como ENUM
    allowNull: false,
    defaultValue: 'active', // Valor padrão
  },
});

function createTableMatches() {
  return matchModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de matches criada com sucesso*******');
  });
}

export { matchModel, createTableMatches };
