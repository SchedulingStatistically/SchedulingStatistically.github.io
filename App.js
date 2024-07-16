const { useState } = React;
const { Calendar, momentLocalizer } = ReactBigCalendar;
const localizer = momentLocalizer(moment);

function DropdownMenu({ task, position, incompleteReasons, handleIncompleteTask }) {
  return ReactDOM.createPortal(
    <ul
      className="dropdown-menu"
      style={{ top: position.top, left: position.left, position: 'absolute' }}
    >
      {incompleteReasons.map((reason, index) => (
        <li key={index} onClick={() => handleIncompleteTask(task.id, reason)}>{reason}</li>
      ))}
    </ul>,
    document.body
  );
}

function App() {
  // State variables
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [editingTaskTime, setEditingTaskTime] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  const [incompletedTasks, setIncompletedTasks] = useState([]);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });


  const incompleteReasons = [
    "Procrastination",
    "Overcommitment",
    "Distractions",
    "Lack of Resources",
    "Personal",
    "Time Management",
    "Other"
  ];

  // Function to add a new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() && newTaskTime.trim()) {
      const task = { id: Date.now(), text: newTask, time: `${newTaskTime} minutes` };
      setTasks([...tasks, task]);
      setNewTask('');
      setNewTaskTime('');
    }
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    setCompletedTasks(completedTasks.filter(task => task.id !== id));
    setIncompletedTasks(incompletedTasks.filter(task => task.id !== id));
  };

  // Function to edit a task
  const editTask = (id, newText, newTime) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, text: newText, time: `${newTime} minutes` } : task
    );
    setTasks(updatedTasks);
    const updatedCompletedTasks = completedTasks.map(task =>
      task.id === id ? { ...task, text: newText, time: `${newTime} minutes` } : task
    );
    setCompletedTasks(updatedCompletedTasks);
    const updatedIncompletedTasks = incompletedTasks.map(task =>
      task.id === id ? { ...task, text: newText, time: `${newTime} minutes` } : task
    );
    setIncompletedTasks(updatedIncompletedTasks);
    setEditingTaskId(null);
    setEditingTaskText('');
    setEditingTaskTime('');
  };

  // Function to start editing a task
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskText(task.text);
    setEditingTaskTime(task.time.replace(' minutes', ''));
  };

  // Function to handle key press while editing
  const handleEditKeyPress = (e, id) => {
    if (e.key === 'Enter') {
      editTask(id, editingTaskText, editingTaskTime);
    }
  };

  // Function to mark a task as complete
  const completeTask = (id) => {
    const task = tasks.find(task => task.id === id);
    setCompletedTasks([...completedTasks, task]);
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Function to mark a task as incomplete
  const incompleteTask = (id, reason) => {
    const task = tasks.find(task => task.id === id);
    setIncompletedTasks([...incompletedTasks, { ...task, reason }]);
    setTasks(tasks.filter(task => task.id !== id));
    setActiveDropdownId(null);
  };

  // Toggle dropdown menu
  const toggleDropdown = (id, event) => {
    const rect = event.target.getBoundingClientRect();
    const position = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    };
    setDropdownPosition(position);
    setActiveDropdownId(activeDropdownId === id ? null : id);
  };


  return (
    <div className="container">
      <div className="planner">
        <div className="task-input-area">
          <h2>Daily Planner</h2>
          <form onSubmit={addTask}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="task-input"
            />
            <input
              type="text"
              value={newTaskTime}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  setNewTaskTime(e.target.value);
                }
              }}
              placeholder="Estimated time (minutes)"
              className="task-input"
            />
            <button type="submit">Add Task</button>
          </form>
        </div>
      </div>
      <div className="task-lists">
        <div className="task-list-area">
          <h2>Task List</h2>
          <div className="task-list-scrollable">
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className={`task-item ${editingTaskId === task.id ? 'editing' : ''}`}>
                  {editingTaskId === task.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingTaskText}
                        onChange={(e) => setEditingTaskText(e.target.value)}
                        className="task-input"
                        autoFocus
                      />
                      <input
                        type="text"
                        value={editingTaskTime}
                        onChange={(e) => {
                          if (!isNaN(e.target.value)) {
                            setEditingTaskTime(e.target.value);
                          }
                        }}
                        className="task-input"
                      />
                      <button onClick={() => editTask(task.id, editingTaskText, editingTaskTime)}>Save</button>
                      <button onClick={() => setEditingTaskId(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <span>{task.text}</span>
                      {task.time && (
                        <span style={{ marginLeft: '10px' }}>{`${task.time}`}</span>
                      )}
                    </div>
                  )}
                  <div className="task-buttons">
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                    <button onClick={() => startEditing(task)}>Edit</button>
                    <button onClick={() => completeTask(task.id)}>Complete</button>
                    <div className="dropdown">
                      <button onClick={(e) => toggleDropdown(task.id, e)}>Incomplete</button>
                      {activeDropdownId === task.id && (
                        <DropdownMenu
                          task={task}
                          position={dropdownPosition}
                          incompleteReasons={incompleteReasons}
                          handleIncompleteTask={incompleteTask}
                        />
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="completed-incompleted-area">
          <div className="completed-task-list-area">
            <h2>Completed Tasks</h2>
            <ul className="task-list">
              {completedTasks.map(task => (
                <li key={task.id} className="task-item">
                  <div>
                    <span>{task.text}</span>
                    <span style={{ marginLeft: '10px' }}>{` ${task.time}`}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="incompleted-task-list-area">
            <h2>Incompleted Tasks</h2>
            <ul className="task-list">
              {incompletedTasks.map(task => (
                <li key={task.id} className="task-item">
                  <div>
                    <span>{task.text}</span>
                    <span style={{ marginLeft: '10px' }}>{` ${task.time}`}</span>
                    {task.reason && <span className="incomplete-reason">Reason: {task.reason}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
