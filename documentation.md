<h1>Scheduling Statistically Documentation</h1>

<p>welcome to the documentation for Scheduling Statistically! Our project helps users with time management through statistical analysis of a user's behavior</p>

<h2>Frontend</h2>

<h3>Landing Page</h3>

<h3>Charts</h3>
  
<h2>Backend</h2>

<h3>Data Structure</h3>
<p>Information about datastructures goes here</p>

<h3>Database</h3>
For our database, we used Airtable, a relatively low barrier to entry database, paired with the Airtable API in order to access, modify, and create records. For the abstraction, we used three objects: DatabaseObj, ScheduledEvent and User that were modified from the data structure design. The database itself is comprised of two pages which store properties of each respective object: ScheduledEvent and User.

<h4><ins>DatabaseObj</ins></h4>

<p>The database object served as a parent class for the following objects providing abstractions for interacting with the database</p>

<h5>Properties</h5>

<ul>
  <li>base_id: identifies the database in the api calls</li>
  <li>auth_token: the authentication token</li>
  <li>obj_type: used for api calls in order to identify which page to access in the database</li>
  <li>obj_id: a unique ID given to each record to identify it</li>
  <li>base: used for api calls to the DB, combines and produces a unique Airtable object with the auth_token and base_id</li>
</ul>

<h5>Functions</h5>

<ul>
  <li>create: creates an entry in the respective page of the database</li>
  <li>update: updates an entry in the database based off of the obj_id</li>
  <li>export: combines create an update, creating an entry if it exists in the database and updating if it doesn't</li>
</ul>

<h4>ScheduledEvent</h4>

<p>This is a representation of any event/task that a user creates with date and statistics. This object has getters and setters used as if you were modifying the property. Creating a ScheduledEvent with one argument of the obj_id will pull all properties of that user_id from the database.</p>

<h5><in>Properties</in></h5>

<ul>
  <li>owner: the user that "owns" the events</li>
  <li>name: the name of the event</li>
  <li>year: the year the event was created</li>
  <li>month: the month the event was created</li>
  <li>day: the day the event was created</li>
  <li>start: when the event will start</li>
  <li>hours: the amount of time the event will take</li>
  <li>end: when the event will end</li>
  <li>max: the max amount of time the user has spent on this event in the past</li>
  <li>min: the min amount of time the user has spent on this event in the past</li>
  <li>median: the median amount of time the user has spent on this event in the past</li>
  <li>mode: the mode amount of time the user has spent on this event in the past</li>
</ul>

<h5><in>Functions</in></h5>

<ul>
  <li>createDBEntry: uses inherited functions to create an entry in the database, waiting for a response before continuing</li>
  <li>updateFromDB: updates all properties of current object </li>
</ul>

  
<h4>User</h4>
