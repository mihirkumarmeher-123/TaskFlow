import { Task, TimeEntry, User } from '../models/index.js';
import createCsvWriter from 'csv-writer';
export const projectTaskSummary = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const tasks = await Task.findAll({ where: { projectId } });
    const total = tasks.length;
    const statusCounts = tasks.reduce((acc, t) => { acc[t.status] = (acc[t.status] || 0) + 1; return acc; }, {});
    return res.json({ total, statusCounts });
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const exportTimeEntriesCSV = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const rows = await TimeEntry.sequelize.query(
      `SELECT te.*, t.title as taskTitle, u.name as userName FROM TimeEntries te JOIN Tasks t ON te.taskId = t.id JOIN Users u ON te.userId = u.id WHERE t.projectId = ?`,
      { replacements: [projectId], type: TimeEntry.sequelize.QueryTypes.SELECT }
    );
    const csvWriter = createCsvWriter.createObjectCsvStringifier({
      header: [
        { id: 'taskId', title: 'Task ID' },
        { id: 'taskTitle', title: 'Task' },
        { id: 'userId', title: 'User ID' },
        { id: 'userName', title: 'User' },
        { id: 'date', title: 'Date' },
        { id: 'hours', title: 'Hours' },
        { id: 'notes', title: 'Notes' }
      ]
    });
    const header = csvWriter.getHeaderString();
    const body = csvWriter.stringifyRecords(rows.map(r => ({ taskId: r.taskId, taskTitle: r.taskTitle, userId: r.userId, userName: r.userName, date: r.date, hours: r.hours, notes: r.notes })));
    res.setHeader('Content-disposition', `attachment; filename=project_${projectId}_timeentries.csv`);
    res.setHeader('Content-Type', 'text/csv');
    return res.send(header + body);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
