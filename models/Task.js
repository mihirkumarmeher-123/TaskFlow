import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  projectId: { type: DataTypes.INTEGER },
  assigneeId: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  priority: { type: DataTypes.ENUM('low','medium','high','critical'), defaultValue: 'medium' },
  status: { type: DataTypes.ENUM('todo','in_progress','in_review','done','blocked'), defaultValue: 'todo' },
  estimateHours: { type: DataTypes.FLOAT, defaultValue: 0 },
  dueDate: { type: DataTypes.DATEONLY }
});
export default Task;
