import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Attachment = sequelize.define('Attachment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  filename: { type: DataTypes.STRING, allowNull: false },
  originalName: { type: DataTypes.STRING, allowNull: false },
  taskId: { type: DataTypes.INTEGER },
  projectId: { type: DataTypes.INTEGER },
  uploadedBy: { type: DataTypes.INTEGER, allowNull: false }
});
export default Attachment;
