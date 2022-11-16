import Sequelize from 'sequelize';

export default (sequelize) => {
  return sequelize.define(
    'userdata',
    {
      user: {
        type: Sequelize.STRING,
        unique: true,
      },
      balance: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
