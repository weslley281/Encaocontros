import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

const notificationModel = connection.define('notifications', {
  notification_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  notification_type: {
    type: DataTypes.ENUM('match', 'message', 'signature'),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notificationd_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM('read', 'unread'),
    allowNull: false,
  },
});

function createTableNotifications() {
  return notificationModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de favoritos criada com sucesso*******');
  });
}

export { notificationModel, createTableNotifications };
