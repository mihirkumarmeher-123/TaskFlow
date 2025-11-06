# 🚀 TaskFlow – Collaborative Project Management API

TaskFlow is a **Node.js + Express + MySQL** backend API that enables teams to collaboratively manage projects, tasks, teams, comments, files, and reports.  
It provides **role-based access (Admin, Manager, Member)**, **JWT authentication**, **Sequelize ORM**, and an interactive **Swagger API documentation**.


## 🧩 Features

- 🔐 **Authentication & Authorization**
  - Register, login, JWT-based security
  - Role-based access control (admin / manager / member)

- 🧱 **Project Management**
  - Create, update, delete, and view projects
  - Track project status (planning → active → completed)

- 👥 **Team Management**
  - Create teams under projects
  - Add or list members with roles (lead, developer, tester…)

- 🧾 **Task Management**
  - Create, assign, update, and delete tasks
  - Track task priority, status, dependencies, and due dates

- 💬 **Comments & Collaboration**
  - Add comments to tasks for discussion and tracking

- 📁 **File Uploads**
  - Attach files to tasks or projects (Multer middleware)

- 📊 **Reports**
  - Task summaries by project
  - Export time entries as CSV for performance insights

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Backend | Node.js, Express.js |
| Database | MySQL (via Sequelize ORM) |
| Authentication | JWT (jsonwebtoken) |
| File Upload | Multer |
| API Docs | Swagger (OpenAPI 3.0.3) |
| Environment | dotenv |
| Dev Utility | nodemon |


