import { Team, TeamMember, User } from '../models/index.js';
export const createTeam = async (req, res) => {
  try {
    const { projectId, name, description } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const team = await Team.create({ projectId, name, description });
    return res.status(201).json(team);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const addMember = async (req, res) => {
  try {
    const { teamId, userId, role = 'developer' } = req.body;
    if (!teamId || !userId) return res.status(400).json({ message: 'Missing fields' });
    const exists = await TeamMember.findOne({ where: { teamId, userId } });
    if (exists) return res.status(409).json({ message: 'Already a member' });
    const member = await TeamMember.create({ teamId, userId, role });
    return res.status(201).json(member);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const listTeamMembers = async (req, res) => {
  try {
    const members = await TeamMember.findAll({ where: { teamId: req.params.teamId }, include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email'] }] });
    return res.json(members);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
