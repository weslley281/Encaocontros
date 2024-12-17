import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

const messageModel = connection.define('messages', {
  message_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  sender_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao usuário que enviou a mensagem
  },
  receiver_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false, // Referência ao usuário que recebeu a mensagem
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false, // Conteúdo da mensagem
  },
  sent_at: {
    type: DataTypes.DATE,
    allowNull: false, // Data e hora em que a mensagem foi enviada
    defaultValue: DataTypes.NOW,
  },
  is_read: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Status de leitura (não lida por padrão)
  },
});

function createTableMessages() {
  return messageModel.sync({ force: false }).then(() => {
    console.log('*******Tabela de mensagens criada com sucesso*******');
  });
}

export { messageModel, createTableMessages };
