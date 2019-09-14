const message = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
      text: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: 'A message must be provided'
          }
        },
      },
      CustomerId: {
        type: DataTypes.INTEGER,
      }
    });
  
    Message.associate = models => {
      Message.belongsTo(models.Customer, {
        foreignKey: 'CustomerId'
      });
    };
  
    return Message;
};
  
export default message;