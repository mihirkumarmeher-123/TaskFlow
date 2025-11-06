import { Task, TaskDependency, Project, User, Comment, TimeEntry } from '../models/index.js';
import { Op } from 'sequelize';
export const createTask = async (req, res) => {
  try {
    const { projectId, title, description, assigneeId, priority, dueDate, estimateHours } = req.body;
    if (!projectId || !title) return res.status(400).json({ message: 'Missing fields' });
    const task = await Task.create({ projectId, title, description, assigneeId, priority, dueDate, estimateHours });
    const io = req.app.get('io'); if (io) io.to('project_' + projectId).emit('taskCreated', task);
    return res.status(201).json(task);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const listTasks = async (req, res) => {
  try {
    const { projectId, status, assigneeId, search, page = 1, limit = 20 } = req.query;
    const where = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (assigneeId) where.assigneeId = assigneeId;
    if (search) where[Op.or] = [{ title: { [Op.like]: `%${search}%` } }, { description: { [Op.like]: `%${search}%` } }];
    const offset = (page - 1) * limit;
    const { count, rows } = await Task.findAndCountAll({ where, limit: parseInt(limit), offset, include: [{ model: User, as: 'assignee', attributes: ['id', 'name'] }] });
    return res.json({ total: count, page: parseInt(page), limit: parseInt(limit), tasks: rows });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const getTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, { include: [{ model: Comment, as: 'comments' }, { model: TimeEntry, as: 'timeEntries' }] });
    if (!task) return res.status(404).json({ message: 'Not found' });
    return res.json(task);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    await Task.update(updates, { where: { id } });
    const updated = await Task.findByPk(id);
    const io = req.app.get('io'); if (io) io.to('project_' + updated.projectId).emit('taskUpdated', updated);
    return res.json(updated);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const deleteTask = async (req, res) => {
  try {
    const t = await Task.findByPk(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    await Task.destroy({ where: { id: req.params.id } });
    const io = req.app.get('io'); if (io) io.to('project_' + t.projectId).emit('taskDeleted', { id: t.id });
    return res.json({ message: 'Deleted' });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const addDependency = async (req, res) => {
  try {
    const { taskId, dependsOnTaskId } = req.body;
    if (!taskId || !dependsOnTaskId) return res.status(400).json({ message: 'Missing fields' });
    if (taskId === dependsOnTaskId) return res.status(400).json({ message: 'Task cannot depend on itself' });
    const exists = await TaskDependency.findOne({ where: { taskId, dependsOnTaskId } });
    if (exists) return res.status(409).json({ message: 'Dependency exists' });
    const dep = await TaskDependency.create({ taskId, dependsOnTaskId });
    return res.status(201).json(dep);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
