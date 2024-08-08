import { Sequelize, DataTypes } from "sequelize";

export const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5433/${process.env.DB_NAME}`)

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to db has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { DataTypes }