# Skill Cloud

## Overview
This project is a full-stack web application that utilizes:
- **Frontend:** React with TypeScript, developed in Visual Studio Code
- **Backend:** Spring Boot, developed in IntelliJ IDEA
- **Database:** MongoDB

## Features
- Modern UI built with React and TypeScript
- Backend API using Spring Boot
- MongoDB for data storage
- RESTful API for communication between frontend and backend

## Tech Stack
### Frontend
- React
- TypeScript
- Axios (for API requests)
- React Router 
- Tailwind CSS or Material UI 

### Backend
- Spring Boot
- Spring Web
- Spring Data MongoDB

### Database
- MongoDB (hosted locally or using MongoDB Atlas)

## Prerequisites
Ensure you have the following installed before setting up the project:
- **Node.js** and **npm/yarn** (for frontend)
- **Java JDK 17+** (for backend)
- **MongoDB** (locally or a MongoDB Atlas account)
- **Visual Studio Code** (for frontend development)
- **IntelliJ IDEA** (for backend development)

## Setup Instructions
### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd linked
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
4. Open `http://localhost:8080` in your browser.

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Set up MongoDB connection in `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb://localhost:27017/yourDatabaseName
   ```
3. Build and run the Spring Boot application:
   ```sh
   mvn spring-boot:run
   ```
4. The backend API will be available at `http://localhost:8080`.

## API Endpoints (Example)
| Method | Endpoint          | Description          |
|--------|------------------|----------------------|
| GET    | /api/users       | Get all users       |
| POST   | /api/users       | Create a new user   |
| GET    | /api/users/{id}  | Get user by ID      |
| PUT    | /api/users/{id}  | Update user details |
| DELETE | /api/users/{id}  | Delete user         |

## Folder Structure
```
project-root/
├── frontend/         # React + TypeScript frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│
├── backend/          # Spring Boot backend
│   ├── src/main/java/
│   ├── src/main/resources/
│   ├── pom.xml
│
└── README.md         # Project documentation
```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## Contact
For any issues or improvements, feel free to open an issue or reach out to me at willowstration@gmail.com

