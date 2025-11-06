import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Project = sequelize.define('Project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  status: { type: DataTypes.ENUM('planning','active','completed','archived'), defaultValue: 'planning' },
  startDate: { type: DataTypes.DATEONLY },
  endDate: { type: DataTypes.DATEONLY }
});
export default Project;
