'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('appointments', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        date: {//dat do agendamento
          allowNull: false,
          type: Sequelize.DATE,
        },
        //a referencia do agendamento do user que marcou o agendamento
        //o user que esta fazendo o agendamento
        user_id: {
          type: Sequelize.INTEGER,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        provider_id: {//qual prestador de serviço que vai atender esse agendamneto
          type: Sequelize.INTEGER,
          references: {model: 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true,
        },
        canceled_at: {//data de cancelamento do agendamento
          type: Sequelize.DATE,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
       });
     
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('appointments');
    
  }
};
