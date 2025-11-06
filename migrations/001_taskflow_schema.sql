CREATE DATABASE IF NOT EXISTS taskflow_db;
USE taskflow_db;
CREATE TABLE IF NOT EXISTS Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','manager','member') DEFAULT 'member',
  createdAt DATETIME,
  updatedAt DATETIME
);
CREATE TABLE IF NOT EXISTS Projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status ENUM('planning','active','completed','archived') DEFAULT 'planning',
  startDate DATE,
  endDate DATE,
  createdAt DATETIME,
  updatedAt DATETIME
);
CREATE TABLE IF NOT EXISTS Teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectId INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (projectId) REFERENCES Projects(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS TeamMembers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  teamId INT NOT NULL,
  role ENUM('lead','developer','tester','designer','other') DEFAULT 'developer',
  createdAt DATETIME,
  updatedAt DATETIME,
  UNIQUE KEY uniq_team_user (userId, teamId),
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
  FOREIGN KEY (teamId) REFERENCES Teams(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectId INT,
  assigneeId INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority ENUM('low','medium','high','critical') DEFAULT 'medium',
  status ENUM('todo','in_progress','in_review','done','blocked') DEFAULT 'todo',
  estimateHours FLOAT DEFAULT 0,
  dueDate DATE,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (projectId) REFERENCES Projects(id) ON DELETE CASCADE,
  FOREIGN KEY (assigneeId) REFERENCES Users(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS TaskDependencies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskId INT NOT NULL,
  dependsOnTaskId INT NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (taskId) REFERENCES Tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (dependsOnTaskId) REFERENCES Tasks(id) ON DELETE CASCADE,
  UNIQUE KEY uniq_dependency (taskId, dependsOnTaskId)
);
CREATE TABLE IF NOT EXISTS Comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskId INT NOT NULL,
  userId INT NOT NULL,
  content TEXT NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (taskId) REFERENCES Tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS Attachments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  originalName VARCHAR(255) NOT NULL,
  taskId INT,
  projectId INT,
  uploadedBy INT NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (taskId) REFERENCES Tasks(id) ON DELETE SET NULL,
  FOREIGN KEY (projectId) REFERENCES Projects(id) ON DELETE SET NULL,
  FOREIGN KEY (uploadedBy) REFERENCES Users(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS TimeEntries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  taskId INT NOT NULL,
  userId INT NOT NULL,
  date DATE NOT NULL,
  hours FLOAT NOT NULL,
  notes TEXT,
  createdAt DATETIME,
  updatedAt DATETIME,
  FOREIGN KEY (taskId) REFERENCES Tasks(id) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
);
CREATE INDEX idx_tasks_project ON Tasks(projectId);
CREATE INDEX idx_tasks_assignee ON Tasks(assigneeId);
CREATE INDEX idx_time_user ON TimeEntries(userId);
CREATE INDEX idx_comments_task ON Comments(taskId);
