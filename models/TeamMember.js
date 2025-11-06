import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
const TeamMember = sequelize.define('TeamMember', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  teamId: { type: DataTypes.INTEGER, allowNull: false },
  role: { type: DataTypes.ENUM('lead','developer','tester','designer','other'), defaultValue: 'developer' }
});
export default TeamMember;
