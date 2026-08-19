# 🚀 devTinder - Developer Connection Platform

A **full-stack developer networking application** that connects developers based on shared interests, skills, and goals. Think "Tinder for developers" – discover, connect, and collaborate with fellow developers in your field.

---

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Key Features Deep Dive](#key-features-deep-dive)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**devTinder** is a modern full-stack platform designed to help developers:
- Create professional profiles showcasing their skills and expertise
- Discover and connect with like-minded developers
- Send/receive connection requests
- Real-time messaging and notifications
- Build a professional network efficiently

**Repositories:**
- 🔗 **Backend:** [devTinder](https://github.com/adityasaini823/devTinder) (Node.js + Express)
- ⚛️ **Frontend:** [devTinder-frontend](https://github.com/adityasaini823/devTinder-frontend) (React + Vite)

---

## ✨ Features

### Core Functionality
- ✅ **User Authentication & Authorization**
  - Secure JWT-based authentication
  - Password hashing with bcrypt
  - Session management with cookie-parser
  
- ✅ **Developer Profiles**
  - Customizable developer profiles
  - Skill tags and expertise showcase
  - Profile image uploads with image optimization
  - Bio and professional information

- ✅ **Connection Management**
  - Send connection requests to other developers
  - Accept/Reject incoming requests
  - View pending requests
  - Manage active connections
  
- ✅ **Real-Time Features**
  - Live notifications using Socket.io
  - Real-time chat messaging
  - Instant connection status updates
  - Online/offline presence indicators

- ✅ **Discovery Feed**
  - Personalized developer recommendations
  - Filter by skills, experience level, and location
  - Browse potential connections

### Advanced Features
- 🔐 Input validation with Joi schemas
- 📸 Image optimization and storage
- 🔄 CORS enabled for cross-domain requests
- 📅 Timestamp tracking with dayjs
- 🛠️ Process management with PM2
- 📦 Scalable architecture with Mongoose ODM

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework & routing |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM for MongoDB |
| **JWT** | Authentication token |
| **bcrypt** | Password encryption |
| **Socket.io** | Real-time communication |
| **Multer** | File upload handling |
| **Sharp** | Image optimization |
| **Joi** | Request validation |
| **CORS** | Cross-origin resource sharing |
| **Cookie-Parser** | Cookie management |
| **PM2** | Process management |
| **Nodemon** | Development auto-restart |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI library |
| **Vite** | Build tool & dev server |
| **Redux Toolkit** | State management |
| **React Router** | Navigation |
| **Tailwind CSS** | Styling |
| **DaisyUI** | UI components |
| **Axios** | HTTP client |
| **Socket.io-client** | Real-time communication |

---

## 📁 Project Structure

```
devTinder (Backend)
├── app.js                 # Express app setup
├── config/
│   └── database.js       # MongoDB connection
├── models/
│   ├── User.js          # User schema
│   ├── ConnectionRequest.js  # Connection request schema
│   └── Message.js       # Chat messages schema
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── user.js          # User profile endpoints
│   ├── request.js       # Connection request endpoints
│   └── message.js       # Messaging endpoints
├── middleware/
│   ├── auth.js          # JWT verification
│   └── validation.js    # Joi validation schemas
├── utils/
│   ├── imageUpload.js   # File upload configuration
│   └── helpers.js       # Utility functions
├── .env.example         # Environment variables template
└── package.json         # Dependencies

devTinder-frontend (Frontend)
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── store/          # Redux store & slices
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── public/             # Static assets
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB instance (local or cloud)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityasaini823/devTinder.git
   cd devTinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/devTinder
   
   # JWT
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=7d
   
   # Server
   PORT=3000
   NODE_ENV=development
   
   # Socket.io (if deployed)
   SOCKET_IO_URL=http://localhost:3000
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

   Server runs at: `http://localhost:3000`

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityasaini823/devTinder-frontend.git
   cd devTinder-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Update the API base URL in your environment or config:
   ```javascript
   const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend runs at: `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup          - Register new user
POST   /api/auth/login           - User login
POST   /api/auth/logout          - User logout
POST   /api/auth/refresh         - Refresh JWT token
```

### User Management
```
GET    /api/users/profile        - Get current user profile
PUT    /api/users/profile        - Update user profile
GET    /api/users/:id            - Get user by ID
POST   /api/users/upload-photo   - Upload profile photo
DELETE /api/users/:id            - Delete user account
```

### Connection Requests
```
POST   /api/requests/send        - Send connection request
POST   /api/requests/accept/:id  - Accept connection request
POST   /api/requests/reject/:id  - Reject connection request
GET    /api/requests/pending     - Get pending requests
GET    /api/requests/connections - Get all connections
GET    /api/requests/sent        - Get sent requests
```

### Messaging
```
GET    /api/messages/:userId     - Get messages with user
POST   /api/messages/send        - Send message
GET    /api/messages/conversations - Get all conversations
DELETE /api/messages/:messageId  - Delete message
```

### Discovery
```
GET    /api/discover             - Get recommended developers
GET    /api/discover/search      - Search developers by skills
```

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  emailId: String (unique),
  password: String (hashed),
  age: Number,
  gender: String,
  photoUrl: String,
  bio: String,
  skills: [String],
  experience: String,
  location: String,
  github: String,
  linkedin: String,
  createdAt: Date,
  updatedAt: Date
}
```

### ConnectionRequest Collection
```javascript
{
  _id: ObjectId,
  fromUserId: ObjectId (ref: User),
  toUserId: ObjectId (ref: User),
  status: String (interested, ignored, accepted, rejected),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Collection
```javascript
{
  _id: ObjectId,
  senderId: ObjectId (ref: User),
  receiverId: ObjectId (ref: User),
  text: String,
  timestamp: Date
}
```

---

## 🎯 Key Features Deep Dive

### 1. Real-Time Notifications
Using **Socket.io**, users get instant notifications when:
- Someone sends a connection request
- A request is accepted/rejected
- New messages arrive
- User comes online

### 2. Secure Authentication
- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens for stateless authentication
- Cookie-based session management
- Token expiration and refresh mechanisms

### 3. Image Optimization
- Images uploaded via Multer
- Optimized with Sharp library
- Stored efficiently for fast loading
- Responsive image serving

### 4. Data Validation
- All inputs validated with Joi schemas
- Custom error messages for better UX
- Prevents injection attacks
- Type-safe data handling

---

## 🔮 Future Enhancements

- [ ] **Advanced Filtering** - Filter by tech stack, experience level, location
- [ ] **Recommendations Algorithm** - Smart matching based on compatibility
- [ ] **User Reviews/Ratings** - Rating system for connections
- [ ] **Blog/Articles** - Share technical articles and insights
- [ ] **Video Chat** - WebRTC video chat integration
- [ ] **Notifications** - Email notifications for important events
- [ ] **Analytics Dashboard** - User activity and connection stats
- [ ] **Mobile App** - React Native mobile application
- [ ] **Search & Filters** - Advanced search with multiple filters
- [ ] **Two-Factor Authentication** - Enhanced security with 2FA

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 🙋 Support & Contact

For questions or suggestions:
- 📧 Email: adityasaini823@gmail.com
- 💼 LinkedIn: [Your LinkedIn Profile]
- 🐙 GitHub: [@adityasaini823](https://github.com/adityasaini823)

---

## 📈 Project Stats

- **Backend Language:** JavaScript (Node.js)
- **Frontend Framework:** React 19 + Vite
- **Database:** MongoDB
- **Real-Time:** Socket.io
- **Authentication:** JWT + bcrypt
- **Styling:** Tailwind CSS + DaisyUI

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:
- ✅ Full-stack MERN/MEAN development
- ✅ RESTful API design
- ✅ Real-time communication (Socket.io)
- ✅ Database design and optimization
- ✅ Authentication & Authorization
- ✅ File upload & image processing
- ✅ State management with Redux
- ✅ Modern web technologies and best practices

---

**Made with ❤️ by Aditya Saini**
