import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const TaskDependency = sequelize.define('TaskDependency', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  taskId: { type: DataTypes.INTEGER, allowNull: false },
  dependsOnTaskId: { type: DataTypes.INTEGER, allowNull: false }
});
export default TaskDependency;
