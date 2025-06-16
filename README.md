# HackHub Blog

A full-stack blog website built with the MERN stack (MongoDB, Express, React, Node.js) featuring user authentication, post creation and management, comments, and a responsive user interface.

## Features

- User authentication with JWT and Google OAuth
- Create, read, update, and delete blog posts
- Comment system
- Admin dashboard
- Mobile-responsive UI using Tailwind CSS
- Dark/light theme toggle
- Search functionality
- Share posts to social media

## Tech Stack

### Frontend:

- React
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Flowbite React Components
- Firebase (for Google authentication)
- React Quill (rich text editor)

### Backend:

- Node.js
- Express
- MongoDB/Mongoose
- JSON Web Token
- Bcrypt.js

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn
- MongoDB account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/hackhub-blog.git
cd hackhub-blog
```

2. Install dependencies:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

3. Create a `.env` file in the root directory with the following variables:

```
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the application:

```bash
# Run both backend and frontend
npm run dev-all

# Run only backend
npm run dev

# Run only frontend
npm run client
```

This will start both the backend server (on port 3000) and the frontend development server.

### Troubleshooting

If you encounter permission issues during npm installation (EPERM errors), try one of these solutions:

- Close any applications that might be using the files (e.g., VS Code, terminals)
- Run your terminal as administrator
- If on Windows, you can try:
  ```bash
  npm cache clean --force
  npm install
  ```

## Folder Structure

- `/api` - Backend server code
  - `/controllers` - Route controllers
  - `/models` - Database models
  - `/routes` - API routes
  - `/utils` - Utility functions
- `/client` - Frontend React application
  - `/src` - Source code
    - `/components` - Reusable components
    - `/pages` - Page components
    - `/redux` - Redux store and slices

## Deployment

The application is set up for local or custom server deployment. All Vercel-specific configuration has been removed.

### Backend Deployment

1. Deploy the API to your preferred Node.js hosting provider or your own server.
2. Set the root directory to `/api` if needed.
3. Configure your environment variables as required.

### Frontend Deployment

1. Build the client application using `npm run build` in the `/client` directory.
2. Deploy the contents of the `/client/dist` folder to your preferred static hosting provider or your own server.
3. Configure your environment variables as required.

### Deployment URLs

- Frontend: http://localhost:5173 (or your custom domain)
- Backend: http://localhost:3000/api (or your custom domain)

## License

This project is licensed under the ISC License.
