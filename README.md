# `Thought-Share` | [Deployed Link](https://thought-share-lpks.onrender.com) | [Video Link](https://drive.google.com/file/d/14DQES-CI7IobLaCLEoa6Ksn8jAUv6liE/view?usp=sharing)

## Overview
**Thought-Share** is a full-stack social media web application designed to provide a platform where users can create, share, and interact with posts. Users can like and comment on posts, upload images, and manage content seamlessly. This project demonstrates a strong grasp of modern web development technologies and practices, showcasing robust authentication and efficient media handling.

## Screenshot
![Screenshot (1750)](https://github.com/user-attachments/assets/635be324-6ee5-4c72-bc44-97b4e2ac5557)

## Features
- **Post Creation and Sharing:** Users can create and share text-based or image-based posts.
- **Engagement:** Users can like and comment on posts to interact with content.
- **Image Upload:** Integrated with Cloudinary for efficient image storage and delivery.
- **Secure Authentication:** JWT-based authentication ensures that only verified users can manage posts and interact with the application.
- **RESTful API Implementation:** Utilized Express for server-side API management.
- **Responsive Design:** Styled with CSS for an intuitive and user-friendly interface.

---

## Technologies Used
- **Frontend:** ReactJS, TypeScript, CSS
- **Backend:** Express, Node.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT
- **Image Storage:** Cloudinary
- **HTTP Client:** Axios

---

## Prerequisites
Before running this project, ensure that the following are installed:
- Node.js (v14+)
- MongoDB (local or remote instance)
- Cloudinary account with API credentials

---

## Getting Started

#### Clone the Repository
```bash
git clone https://github.com/your-username/thought-share.git
cd thought-share
```

## Install Dependencies
### Navigate to Backend
```bash
cd backend
npm install
```

### Navigate to Frontend
```bash
cd ../frontend
npm install
```


## Configure Environment Variables
Create a .env file in the backend directory with the following configuration:
```bash
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```


## Start the Application
```bash
cd backend
npm start

cd ../frontend
npm start
```

## Access the Application
Open your browser and navigate to:
```bash
http://localhost:3000
```



