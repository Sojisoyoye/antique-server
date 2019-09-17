import { hashPassword } from '../helpers';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'This email address is already in use'
      },
      validate: {
        isEmail: {
          arg: true,
          msg: 'This email must be a valid email address'
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required.'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      isIn: {
        args: [['user', 'admin']],
        message: 'User role can only be user or admin',
      },
      defaultValue: 'user',
    },
  }, {});

  User.beforeCreate(async (newUser) => {
    newUser.password = hashPassword(newUser.password);
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};

export default user;

