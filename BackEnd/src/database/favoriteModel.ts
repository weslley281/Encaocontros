import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

const favoriteModel = connection.define('favorites', {
  favorite_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao usuário que marcou o favorito
  },
  favorite_type: {
    type: DataTypes.ENUM('user', 'pet', 'advertisement'), // O tipo de item favoritado
    allowNull: false,
  },
  favorite_item_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao ID do item favoritado (usuário, pet ou anúncio)
  },
  favorited_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Data e hora em que o item foi favoritado
  },
});

function createTableFavorites() {
  return favoriteModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de favoritos criada com sucesso*******');
  });
}

export { favoriteModel, createTableFavorites };
