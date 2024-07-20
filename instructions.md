## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/)
* You have a Windows/Linux/Mac machine.

## Installing Daily Planner Application

To install the Daily Planner Application, follow these steps:

1. Clone the repository
https://github.com/SchedulingStatistically/SchedulingStatistically.github.io.git
2. Navigate to the project directory
cd your-repo-name
3. Install the dependencies
npm install

## Using Daily Planner Application

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