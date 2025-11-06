import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const TimeEntry = sequelize.define('TimeEntry', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  taskId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  date: { type: DataTypes.DATEONLY, allowNull: false },
  hours: { type: DataTypes.FLOAT, allowNull: false },
  notes: { type: DataTypes.TEXT }
});
export default TimeEntry;
