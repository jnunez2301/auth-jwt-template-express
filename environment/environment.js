require('dotenv').config();

const {
  PORT,
  FRONTEND_URL,
  MONGODB_URI,
  JWT_SECRET_KEY,
  DB_NAME
} = process.env;

module.exports = {
  PORT,
  FRONTEND_URL,
  MONGODB_URI,
  JWT_SECRET_KEY,
  DB_NAME
};
