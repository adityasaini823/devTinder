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
