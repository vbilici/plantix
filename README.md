# Plantix Coding Challenge

## Overview

The project is structured into two main components: a backend system developed with Nest.js and Prisma with TypeScript, and a frontend interface built using React with TypeScript. The backend handles sensor data using RESTful API endpoints and WebSocket connections for real-time updates, while the frontend provides a dashboard for data display.

### Backend
- **Framework**: Nest.js with TypeScript and socket gateway
- **ORM**: Prisma
- **Database**: SQLite

### Frontend
- **Framework**: React with TypeScript
- **CSS Framework**: Tailwind CSS
- **Real-time Data Handling**: Socket.io

## Features

- **Data Management**: Post and retrieve sensor data through RESTful APIs.
- **Real-Time Updates**: Utilize WebSockets for live data updates without the need for manual refresh.
- **Sensor Data Visualization**: I used tremor framework for data visualization
- **Sensor Data Simulation**: Generate fake sensor data to simulate real-world scenarios. It generates new fake data every 5 seconds

## Getting started

### Requirements
- Node.js
- npm
- SQLite

### How to start
1. Clone the project repository.
2. Install dependencies for both frontend and backend:
   - go to root folder
   - `npm install`
   - `npm run prisma:migrate`
   - `cd backend && npm install`

3. Start the backend server in a new terminal:
   - go to root folder
   - `cd backend`
   - `npm start`

4. start the frontend application in a new terminal:
   - go to root folder
   - `npm start`

5. Start the fake data generator In a new terminal:
   - go to root folder
   - `cd backend`
   - `npm run generate:fake-data`

### Prisma
You can check the database contents by running the command below from the root folder
```
npm run prisma studio
```