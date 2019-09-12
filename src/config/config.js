import dotenv from 'dotenv';

dotenv.config();
module.exports = {
  "development": {
    use_env_variable: 'DATABASE_URL_DEV',
    url: process.env.DATABASE_URL_DEV,
    dialect: 'postgres'
  },
  "test": {
    storage: './database.sqlite',
    dialect: 'sqlite',
    logging: false
  },
  "production": {
    use_env_variable: 'DATABASE_URL',
    url: process.env.DATABASE_URL,
    dialect: 'postgres'
  }
}
