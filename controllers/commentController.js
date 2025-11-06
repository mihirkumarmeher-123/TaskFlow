import { Comment } from '../models/index.js';
export const addComment = async (req, res) => {
  try {
    const { taskId, content } = req.body;
    if (!taskId || !content) return res.status(400).json({ message: 'Missing fields' });
    const comment = await Comment.create({ taskId, userId: req.user.id, content });
    const io = req.app.get('io'); if (io) io.to('project_' + (req.body.projectId || '')).emit('commentAdded', comment);
    return res.status(201).json(comment);
  } catch (err) { return res.status(500).json({ message: err.message }); }
};
