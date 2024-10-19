import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

const subscriptionModel = connection.define('subscriptions', {
  subscription_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  plan_type: {
    type: DataTypes.ENUM('free', 'paid'),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

function createTableSubscriptions() {
  return subscriptionModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de assinaturas criada com sucesso*******');
  });
}

export { subscriptionModel, createTableSubscriptions };
