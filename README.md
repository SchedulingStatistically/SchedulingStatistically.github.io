# Scheduling Statistically

Welcome to the Scheduling Statistically project repository!

## Project Overview

### Brief Outline of Problem/Opportunity
- Measuring productivity can be challenging.
- Scheduling your future activities based on past data allows for more certainty in planning.
- Scheduling Statistically offers a solution for anyone needing a better scheduling platform by integrating statistical insights into task management and productivity tracking.

### Why This Product?
- **Purpose**: To provide a scheduling platform that utilizes past productivity data to inform future planning.
- **Benefit**: Enhanced productivity and more reliable scheduling based on statistical analysis.

## Team Members
- **Godfrey** (Product Owner & Backend)
- **Daniel** (Frontend)
- **Garrison** (Frontend)
- **Phillip** (Frontend)
- **Clayton** (Backend)
- **Maz** (Backend)

## Project Scope

### High-Level Goals
1. Core Task Management
2. Basic User Interface
3. Productivity Tracking

## Sprints Overview

### Sprint 1 (SCRUM Master: Daniel)
#### Front End
- Website Initialization
- Task Management (Create, Edit, Delete tasks)
- ReactJS Bar Graph Exploration
- **Total Points**: 25

#### Back End
- Database Initialization
- JSON Setup and JS Integration
- JSON, NodeJS, Airtable Exploration
- **Total Points**: 30

### Sprint 2 (SCRUM Master: Maz)
#### Front End
- Task Completion Dropdown
- Productivity Bar Graph Implementation
- ChartJS, D3JS, React, Redux, Context API, Bootstrap, Fetch API integration
- **Total Points**: 31

#### Back End
- Bar Graph API Development (CRUD operations)
- Express, Axios, CORS Policy Compliance, and Website Security
- **Total Points**: 34

### Sprint 3 (SCRUM Master: Philip)
#### Front End
- Pie Chart Implementation
- Bug Fixes & Refinement
- Integration Testing
- Time Tracking Documentation
- ChartJS, D3JS, Toastr, Fetch API integration
- **Total Points**: 42

#### Back End
- Pie Chart API Development
- Secure API Endpoints
- API Documentation
- ExpressJS, NodeJS, Axios, and Airtable Integration with CORS Policy compliance
- Product backend deployment on Render services and frontend deployment on Github Pages
- **Total Points**: 44

## Architecture

### Technologies Used
- **Languages**: ReactJS, HTML/CSS, NodeJS
- **Frameworks**: ChartJS, ExpressJS, Axios, Airtable, NodeJS
- **Development Environments**: Visual Studio Code, Neovim, Notepad++, Chrome
- **Systems**: Airtable relational database and Render backend production server

## Challenges/Risks
1. Learning new technologies.
2. Adapting to new languages.
3. Integrating new frameworks.
4. Implementing authentication.
5. Limitations of Github Pages.
6. Managing API / Libraries.
7. Ensuring smooth integration.
8. Meeting project deadlines.

## Minimum Viable Product (MVP)
- Task Management (Create, Read, Update, Delete tasks)
- Task Completion Tracking
- Productivity Bar Graph
- User Registration and Information Retention
  
***************************************************************************************************************
# Instructions:
### You may use our website that is up and running at https://schedulingstatistically.github.io/
### or run it on your local server or a server of your choice.
### Note: Serving the backend on a server other than local would require editing the server.js file to ensure
### CORS policy is applied to the correct URL. For assistance with that, please contact maaman@ucsc.edu
***************************************************************************************************************
## Instructions for running on a local server:
## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)
* You have a Windows/Linux/Mac machine.

### Installing Daily Planner Application

To install the Daily Planner Application, follow these steps:

1. Clone the repository
https://github.com/SchedulingStatistically/SchedulingStatistically.github.io.git
2. Navigate to the project directory
cd your-repo-name
3. Install the dependencies
npm install

### Using Daily Planner Application

To use Daily Planner Application, follow these steps:

1. Start the backend server (in CMD, PowerShell, or another terminal):
node server.js
You should see a message: "Server running on port 3001"

2. In a new terminal window, start the frontend server:
npx http-server -p 8000
If you don't have http-server installed globally, you can install it with:
npm install -g http-server


3. Open your web browser and go to `http://localhost:8000`

4. You can now use the application:
- Register a new account
- Log in with your credentials
- Add, edit, complete, and mark tasks as incomplete
- Import and export your tasks
