import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import { sequelize } from './models/index.js';
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/files', fileRoutes);
try {
  const doc = YAML.load('./swagger.yaml');
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(doc));
} catch (e) {
  console.warn('swagger.yaml not found');
}
const httpServer = http.createServer(app);
const io = new SocketIOServer(httpServer, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  console.log('Socket connected', socket.id);
  socket.on('joinProject', (projectId) => socket.join('project_' + projectId));
  socket.on('leaveProject', (projectId) => socket.leave('project_' + projectId));
});
app.set('io', io);
const PORT = process.env.PORT || 5001;
const start = async () => {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    await sequelize.sync({ alter: true });
    httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('Failed to start:', err);
  }
};
start();
