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
- npm or yarn
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

The application is set up to be deployed on Vercel.

### Backend Deployment

1. The API is configured to be deployed on Vercel using the configuration in `/api/vercel.json`
2. Connect your GitHub repository to Vercel
3. Set the root directory to `/api`
4. Vercel will automatically detect the Node.js application and use the correct build settings

### Frontend Deployment

1. The client application is configured to be deployed on Vercel using the configuration in `/client/vercel.json`
2. Connect your GitHub repository to Vercel
3. Set the root directory to `/client`
4. The build command (`npm run build`) and output directory (`dist`) are specified in the vercel.json file
5. Environment variables are already configured in `.env.production`
6. Vercel will handle routing for the SPA (Single Page Application) through the rewrites configuration

### Deployment URLs

- Frontend: [https://hackhub-blog.vercel.app](https://hackhub-blog.vercel.app) (example URL, use your actual deployment URL)
- Backend: [https://blog-website-three-lilac.vercel.app/api](https://blog-website-three-lilac.vercel.app/api)

## License

This project is licensed under the ISC License.
