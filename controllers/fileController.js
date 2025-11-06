import fs from 'fs';
import path from 'path';
import { Attachment } from '../models/index.js';
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file' });
    const { taskId, projectId } = req.body;
    const a = await Attachment.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      taskId: taskId || null,
      projectId: projectId || null,
      uploadedBy: req.user.id
    });
    return res.status(201).json(a);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
export const downloadFile = async (req, res) => {
  try {
    const file = await Attachment.findByPk(req.params.id);
    if (!file) return res.status(404).json({ message: 'Not found' });
    const filePath = path.join(process.cwd(), process.env.UPLOAD_DIR || 'uploads', file.filename);
    if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'File missing' });
    return res.download(filePath, file.originalName);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
