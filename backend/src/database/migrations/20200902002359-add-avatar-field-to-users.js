'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users',//a tabela onde eu quero add
      'avatar_id',//o nome da coluna
      {
        type: Sequelize.INTEGER,
        references: {model: 'files', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('users', 'avatar_id')
  }
};
