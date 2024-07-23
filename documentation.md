<h1>Scheduling Statistically Documentation</h1>
<p>Welcome to the documentation for Scheduling Statistically! Our project helps users with time management through a simple task tracking system.</p>
<h2>Frontend</h2>
<h3>Landing Page</h3>
<p>The landing page consists of a daily planner interface where users can add, edit, complete, and mark tasks as incomplete. It also includes user authentication components for login and registration.</p>
<h3>Task Management</h3>
<ul>
  <li>Add new tasks with estimated time</li>
  <li>Edit existing tasks</li>
  <li>Mark tasks as complete or incomplete</li>
  <li>Delete tasks</li>
  <li>View lists of ongoing, completed, and incomplete tasks</li>
</ul>
<h3>Chart</h3>
<p>The application includes a productivity chart that visualizes the number of completed vs incomplete tasks over time.</p>
<h3>Import/Export</h3>
<p>Users can import and export their task data in JSON format.</p>
<h2>Backend</h2>
<h3>Data Structure</h3>
<p>The backend manages three main data structures:</p>
<ul>
  <li>Tasks: Ongoing tasks with text and estimated time</li>
  <li>Completed Tasks: Tasks marked as complete</li>
  <li>Incompleted Tasks: Tasks marked as incomplete with a reason</li>
</ul>
<h3>Database</h3>
<p>For our database, we use Airtable, accessed through the Airtable API. The database stores user information and task data.</p>
<h4>User Data</h4>
<ul>
  <li>Username</li>
  <li>Password</li>
  <li>UserData: A JSON string containing the user's tasks, completed tasks, and incompleted tasks</li>
</ul>
<h3>API Endpoints</h3>
<ul>
  <li>/register: Creates a new user account</li>
  <li>/login: Authenticates a user and returns their task data</li>
  <li>/sync: Updates a user's task data in the database</li>
</ul>
<h2>Technologies Used</h2>
<ul>
  <li>Frontend: React.js, Chart.js</li>
  <li>Backend: Node.js, Express.js</li>
  <li>Database: Airtable</li>
  <li>Deployment: GitHub Pages (frontend), Render (backend)</li>
</ul>
<h2>Getting Started</h2>
<p>To run the project locally:</p>
<ol>
  <li>Clone the repository</li>
  <li>Install dependencies with <code>npm install</code></li>
  <li>Start the backend server with <code>node server.js</code></li>
  <li>Serve the frontend files using a local server (e.g., <code>http-server</code>)</li>
  <li>Access the application in your web browser</li>
</ol>
<h2>Future Improvements</h2>
<ul>
  <li>Implement more robust user authentication</li>
  <li>Add more detailed statistical analysis of task completion patterns</li>
  <li>Improve mobile responsiveness</li>
  <li>Implement data validation and sanitization</li>
</ul>
