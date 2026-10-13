# 📝 Todo List — Full-Stack Web Application

A full-stack Todo List application that allows users to register, log in, and manage their tasks. The application uses a backend API, MongoDB for data persistence, and session-based authentication to support user-specific task management.

## 🚀 Features

- **User Registration:** Create an account to use the application.
- **User Login:** Authenticate users using their username and password.
- **Password Hashing:** Uses bcrypt to securely hash passwords.
- **Session Management:** Maintains the user's authenticated session.
- **Task Management:** Add, edit, delete, and mark tasks as completed.
- **User-Specific Data:** Stores tasks associated with the relevant user.
- **Persistent Storage:** Uses MongoDB to store user and task data.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML | Structures the web pages |
| CSS | Styles the user interface |
| JavaScript | Handles frontend interactions |
| Node.js | Runs the backend JavaScript environment |
| Express.js | Handles HTTP requests and API routes |
| MongoDB | Stores users and tasks |
| bcrypt | Hashes passwords and verifies login credentials |
| express-session | Manages user sessions |
| Git and GitHub | Version control and source-code hosting |

## ⚙️ Application Workflow

1. A new user registers with their account details.
2. The backend validates the submitted information and stores the user's password as a bcrypt hash.
3. During login, the backend finds the user in MongoDB and verifies the password.
4. After successful authentication, the backend creates a fresh session and stores the user's ID in it.
5. Protected task operations use the session to identify the logged-in user.
6. Task data is stored in MongoDB so it can persist across sessions.

## 📂 Project Structure

```text
to-do-list/
├── backend/
│   ├── index.js
│   ├── package.json
│   └── .gitignore
├── index.html
├── login.html
├── login.js
├── reg.html
├── res.js
├── script.js
├── style.css
└── tasks.html
```

*Note: The exact file structure may vary depending on the current project version.*

## 🔧 Setup and Installation

### Prerequisites

- Node.js and npm
- A MongoDB Atlas account or accessible MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd to-do-list
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `backend/` directory and add the MongoDB connection string using the environment variable name expected by your backend code.

Example:

```env
MONGO_URI=your_mongodb_connection_string
```

Never commit your `.env` file or expose your database credentials publicly.

### 4. Start the backend

```bash
node index.js
```

Open the frontend using your local development server, configured to match the backend's CORS settings.

## 🔐 Security Considerations

- Passwords are stored as bcrypt hashes rather than plain text.
- Database credentials are stored in environment variables.
- Session-based authentication helps the backend identify logged-in users.
- Protected task routes should verify authentication and ensure users can access only their own tasks.

## 🎯 Learning Outcomes

This project provided practical experience with:

- Building a full-stack web application.
- Creating and handling backend API routes.
- Connecting Node.js to MongoDB.
- Implementing registration and login.
- Understanding password hashing and session-based authentication.
- Managing user-specific data.
- Using Git and GitHub for version control.

## 👩‍💻 Author

**Niveditha Totar**

Computer Science and Engineering Student

---

*Built as a learning project to strengthen full-stack development skills and prepare for technical interviews.*
