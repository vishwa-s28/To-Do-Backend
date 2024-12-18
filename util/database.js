require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

const checkIfTableExists = async (tableName) => {
  const tableExists = await sequelize
    .getQueryInterface()
    .showAllTables()
    .then((tables) => tables.includes(tableName));

  if (tableExists) {
    console.log(`✅ Table "${tableName}" already exists.`);
  } else {
    console.log(`❌ Table "${tableName}" does not exist. Creating table...`);
    await createTable();
  }
};

const createTable = async () => {
  try {
    await sequelize.sync();
    console.log("✅ Table created successfully!");
  } catch (error) {
    console.error("❌ Error creating table:", error);
  }
};

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
    await checkIfTableExists("todos");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};
testConnection();
module.exports = sequelize;
