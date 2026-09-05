<div align="center">

# 🔐 GitHub OAuth Authentication

### A Secure Full-Stack Authentication System using React, Node.js, MongoDB & GitHub OAuth

<p align="center">
  A modern authentication system demonstrating GitHub OAuth integration,
  JWT-based authentication, refresh tokens, protected routes, and secure
  HTTP-only cookie management.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/GitHub-OAuth-181717?logo=github&logoColor=white" alt="GitHub OAuth" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Status" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg" alt="PRs Welcome" />
</p>

</div>

---

## 📋 Table of Contents

* [About the Project](#-about-the-project)
* [Features](#-features)
* [Project Screenshots](#-project-screenshots)
* [System Architecture](#-system-architecture)
* [Authentication Flow](#-authentication-flow)
* [Technology Stack](#️-technology-stack)
* [Project Structure](#-project-structure)
* [Installation](#️-installation)
* [Environment Variables](#-environment-variables)
* [API Documentation](#-api-documentation)
* [Security Features](#-security-features)
* [Testing](#-testing)
* [Future Improvements](#-future-improvements)
* [Author](#-author)

---

# 📖 About the Project

**GitHub OAuth Authentication** is a full-stack web application that demonstrates how to implement secure third-party authentication using GitHub OAuth.

Instead of requiring users to create and remember another password, they can securely authenticate using their existing GitHub account.

The application follows a modern authentication architecture:

```text
GitHub OAuth
      ↓
GitHub Authorization
      ↓
Authorization Code
      ↓
Backend Verification
      ↓
Fetch GitHub User
      ↓
MongoDB User Management
      ↓
JWT Generation
      ↓
HTTP-only Cookies
      ↓
Protected React Dashboard
```

The project is designed as a practical example of implementing OAuth authentication in a MERN-style application.

---

# ✨ Features

### 🔑 Authentication

* GitHub OAuth 2.0 authentication
* Secure authorization flow
* Automatic user registration
* Existing user login support

### 🔐 JWT Security

* Short-lived access tokens
* Long-lived refresh tokens
* Secure token verification
* Protected API routes

### 🍪 Cookie Management

* HTTP-only authentication cookies
* Secure cookie configuration
* Automatic browser cookie handling

### 👤 User Management

* GitHub profile integration
* User information stored in MongoDB
* Profile image support
* GitHub username integration
* Email retrieval

### ⚛️ Frontend

* Modern React application
* Responsive design
* Protected dashboard
* Authentication state handling
* Loading states
* Logout functionality

---

# 📸 Project Screenshots

## 🔐 Login Page

The login page provides a clean and simple interface for authenticating with GitHub.

![GitHub OAuth Login Page](./screenshots/login.png)

---

## 👤 User Dashboard

After successful authentication, users are redirected to their personalized dashboard.

![GitHub OAuth Dashboard](./screenshots/dashboard.png)

---

## 🐙 GitHub Authorization

Users are securely redirected to GitHub to authorize the application.

![GitHub Authorization](./screenshots/github-auth.png)

> **Note:** Create a `screenshots` folder in the root directory and add your application screenshots.

```text
screenshots/
├── login.png
├── dashboard.png
└── github-auth.png
```

---

# 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────┐
│                     USER BROWSER                    │
│                                                     │
│                 React + Vite Frontend               │
│                                                     │
│              http://localhost:5173                  │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ Click "Continue with GitHub"
                        ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│                 EXPRESS BACKEND                     │
│                                                     │
│              http://localhost:5000                  │
│                                                     │
│         GET /api/auth/github                        │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ Redirect User
                        ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│                  GITHUB OAUTH                       │
│                                                     │
│        https://github.com/login/oauth/authorize     │
│                                                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ User Authorizes Application
                        ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│              GITHUB CALLBACK                        │
│                                                     │
│ /api/auth/github/callback?code=XXXXX                │
│                                                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ Exchange Authorization Code
                        ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│                 GITHUB API                          │
│                                                     │
│              Fetch User Profile                     │
│                                                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ User Information
                        ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│                   MONGODB                           │
│                                                     │
│              Find or Create User                    │
│                                                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ Generate Tokens
                        ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│                  JWT TOKENS                         │
│                                                     │
│        Access Token + Refresh Token                 │
│                                                     │
└───────────────────────┬─────────────────────────────┘
                        │
                        │ HTTP-only Cookies
                        ▼
┌─────────────────────────────────────────────────────┐
│                                                     │
│                REACT DASHBOARD                      │
│                                                     │
│              Protected User Profile                 │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

# 🔄 Authentication Flow

The following diagram illustrates the complete authentication process.

```text
┌──────────┐
│   User   │
└────┬─────┘
     │
     │ Click Login
     ▼
┌──────────────────┐
│  React Frontend  │
└────────┬─────────┘
         │
         │ GET /api/auth/github
         ▼
┌──────────────────┐
│ Express Backend  │
└────────┬─────────┘
         │
         │ Redirect
         ▼
┌──────────────────┐
│   GitHub OAuth   │
└────────┬─────────┘
         │
         │ Authorization Code
         ▼
┌──────────────────┐
│ Express Callback │
└────────┬─────────┘
         │
         ├───────────────────────────────┐
         │                               │
         ▼                               ▼
┌──────────────────┐             ┌──────────────────┐
│ GitHub User API  │             │     MongoDB      │
└────────┬─────────┘             └────────┬─────────┘
         │                                │
         └───────────────┬────────────────┘
                         ▼
                ┌─────────────────┐
                │   Generate JWT  │
                └────────┬────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ HTTP-only Cookies   │
              └──────────┬───────────┘
                         │
                         ▼
                ┌─────────────────┐
                │    Dashboard    │
                └─────────────────┘
```

---

# 🛠️ Technology Stack

| Category          | Technology       |
| ----------------- | ---------------- |
| Frontend          | React.js         |
| Build Tool        | Vite             |
| HTTP Client       | Axios            |
| Routing           | React Router DOM |
| Backend           | Node.js          |
| Server Framework  | Express.js       |
| Database          | MongoDB          |
| ODM               | Mongoose         |
| Authentication    | GitHub OAuth     |
| Token Management  | JSON Web Token   |
| Cookies           | Cookie Parser    |
| API Communication | REST API         |

---

# 📁 Project Structure

```text
github-oauth/
│
├── backend/
│   │
│   ├── controllers/
│   │   └── authController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   └── authRoutes.js
│   │
│   ├── utils/
│   │   └── generateTokens.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
├── frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   └── Login.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   └── Dashboard.css
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   └── package.json
│
├── screenshots/
│   ├── login.png
│   ├── dashboard.png
│   └── github-auth.png
│
└── README.md
```

---

# ⚙️ Installation

## 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/github-oauth.git
```

Navigate to the project:

```bash
cd github-oauth
```

---

# 🖥️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

# ⚛️ Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

## Backend `.env`

Create a `.env` file inside the `backend` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

FRONTEND_URL=http://localhost:5173

JWT_ACCESS_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret

NODE_ENV=development
```

---

## Frontend `.env`

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

---

# 🐙 GitHub OAuth Configuration

Create a GitHub OAuth application.

Navigate to:

```text
GitHub
   ↓
Settings
   ↓
Developer Settings
   ↓
OAuth Apps
   ↓
New OAuth App
```

Use the following configuration:

| Setting                    | Development Value                                |
| -------------------------- | ------------------------------------------------ |
| Application Name           | GitHub OAuth Authentication                      |
| Homepage URL               | `http://localhost:5173`                          |
| Authorization Callback URL | `http://localhost:5000/api/auth/github/callback` |

After creating the application, copy the following credentials into your backend `.env` file:

```text
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
```

> ⚠️ Never expose your GitHub Client Secret in the frontend.

---

# 📡 API Documentation

## Start GitHub Login

```http
GET /api/auth/github
```

Redirects the user to GitHub's authorization page.

---

## GitHub OAuth Callback

```http
GET /api/auth/github/callback
```

Handles the authorization code returned by GitHub.

---

## Get Current User

```http
GET /api/auth/me
```

### Response

```json
{
  "user": {
    "_id": "user_id",
    "githubId": "123456789",
    "username": "github_username",
    "displayName": "User Name",
    "email": "user@example.com",
    "avatar": "profile_image_url",
    "githubProfileUrl": "https://github.com/github_username"
  }
}
```

---

## Refresh Access Token

```http
POST /api/auth/refresh
```

Generates a new access token using a valid refresh token.

### Response

```json
{
  "message": "Access token refreshed"
}
```

---

## Logout

```http
POST /api/auth/logout
```

Removes authentication cookies.

### Response

```json
{
  "message": "Logged out successfully"
}
```

---

# 🔐 Security Features

This application implements several authentication security practices.

### HTTP-only Cookies

Authentication tokens are stored in HTTP-only cookies.

```javascript
res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 15 * 60 * 1000,
});
```

### Short-Lived Access Token

```text
Expiration: 15 Minutes
```

### Long-Lived Refresh Token

```text
Expiration: 7 Days
```

### Protected Routes

Protected API endpoints require a valid JWT access token.

```text
Client Request
      │
      ▼
Authentication Middleware
      │
      ▼
Verify JWT
      │
      ├── Invalid → 401 Unauthorized
      │
      └── Valid → Continue Request
```

---

# 🧪 Testing

## Manual Testing Flow

### 1️⃣ Start MongoDB

Ensure your MongoDB connection is configured correctly.

### 2️⃣ Start the Backend

```bash
cd backend
npm run dev
```

### 3️⃣ Start the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

### 4️⃣ Open the Application

Visit:

```text
http://localhost:5173
```

### 5️⃣ Authenticate

Click:

```text
Continue with GitHub
```

### 6️⃣ Authorize Application

Authorize the application through GitHub.

### 7️⃣ Dashboard

After successful authentication, the user will be redirected to:

```text
http://localhost:5173/dashboard
```

### 8️⃣ Test Logout

Click the logout button and verify that authentication cookies are removed.

---

# 🔮 Future Improvements

* [ ] Add OAuth `state` parameter validation
* [ ] Add PKCE support
* [ ] Implement refresh token rotation
* [ ] Add Axios interceptors
* [ ] Implement React Authentication Context
* [ ] Add protected frontend routes
* [ ] Add automated backend tests
* [ ] Add frontend component tests
* [ ] Add error boundaries
* [ ] Add rate limiting
* [ ] Deploy frontend and backend
* [ ] Add Google OAuth
* [ ] Support multiple OAuth providers

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create your feature branch.

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes.

```bash
git commit -m "Add amazing feature"
```

4. Push to the branch.

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request.

---

# 👨‍💻 Author

## Nikhil Dadhich

**Full Stack Developer | MERN Stack Developer**

Passionate about building scalable web applications, authentication systems, and modern full-stack projects.

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub!

Your support helps improve and maintain this project.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### Made with ❤️ using React, Node.js, MongoDB & GitHub OAuth

**Happy Coding! 🚀**

</div>
