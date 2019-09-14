import { hashPassword } from '../helpers';

const customer = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Username must be provided'
          }
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Email is required'
          },
          isEmail: {
            args: true,
            msg: 'Please provide a valid email'
          }
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: 'Password must be provided'
          },
          len: {
            args: [7, 42],
            msg: 'Password must be between 7 and 42 characters'
          }
        },
      },
      role: {
        type: DataTypes.STRING,
      },
    });
  
    Customer.beforeCreate(async newCustomer => {
      newCustomer.password = hashPassword(newCustomer.password);
    });
  
    Customer.associate = (models) => {
        Customer.hasMany(models.Message, {
          onDelete: 'CASCADE',
          foreignKey: 'CustomerId'
      });
    };
  
    Customer.findByLogin = async login => {
      let customer = await Customer.findOne({
        where: { username: login },
      });
      if (!customer) {
        customer = await Customer.findOne({
          where: { email: login },
        });
      }
      return customer;
    };
  
    return Customer;
};
  
export default customer;