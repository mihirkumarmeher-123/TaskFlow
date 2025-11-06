import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const Team = sequelize.define('Team', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  projectId: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT }
});
export default Team;
