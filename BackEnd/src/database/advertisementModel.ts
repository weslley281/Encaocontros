import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

const advertisementModel = connection.define('advertisements', {
  advertisement_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  advertiser_name: {
    type: DataTypes.STRING,
    allowNull: false, // Nome do anunciante
  },
  ad_type: {
    type: DataTypes.ENUM('banner', 'video', 'popup'), // Tipo de anúncio
    allowNull: false,
  },
  display_location: {
    type: DataTypes.ENUM('home', 'profile', 'search', 'footer'), // Onde o anúncio será exibido
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false, // Data de início da exibição do anúncio
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false, // Data de término da exibição do anúncio
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Indica se o anúncio está ativo ou não
  },
});

function createTableAdvertisements() {
  return advertisementModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de publicidade criada com sucesso*******');
  });
}

export { advertisementModel, createTableAdvertisements };
