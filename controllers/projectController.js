import { Project, Team, Task } from '../models/index.js';
export const createProject = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const project = await Project.create({ name, description, startDate, endDate });
    return res.status(201).json(project);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const listProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page || '1');
    const limit = Math.min(parseInt(req.query.limit || '20'), 100);
    const offset = (page - 1) * limit;
    const { count, rows } = await Project.findAndCountAll({ limit, offset, include: [{ model: Team, as: 'teams' }] });
    return res.json({ total: count, page, limit, projects: rows });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const getProject = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: [{ model: Team, as: 'teams' }, { model: Task, as: 'tasks' }] });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    return res.json(project);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.update(req.body, { where: { id } });
    const p = await Project.findByPk(id);
    return res.json(p);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;
    await Project.destroy({ where: { id } });
    return res.json({ message: 'Deleted' });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
