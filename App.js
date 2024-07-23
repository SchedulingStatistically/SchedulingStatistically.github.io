// App.js

const { useEffect, useState, Fragment, useRef } = React;
const { Calendar, momentLocalizer } = ReactBigCalendar;
const localizer = momentLocalizer(moment);
const axios = window.axios;

const API_URL = 'https://schedulingstatistically-github-io.onrender.com';

// Dropdown Menu Component
function DropdownMenu({ task, position, incompleteReasons, 
    handleIncompleteTask, closeDropdown }) {
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && 
                !dropdownRef.current.contains(event.target)) {
                closeDropdown();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeDropdown]);

    return ReactDOM.createPortal(
        <ul className="dropdown-menu" 
            style={{ top: position.top, left: position.left }} 
            ref={dropdownRef}>
            {incompleteReasons.map((reason, index) => (
                <li key={index} 
                    onClick={() => handleIncompleteTask(task.id, reason)}>
                    {reason}
                </li>
            ))}
        </ul>,
        document.body
    );
}

// Login component
function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(username, password);
    }

    return (
        <div className="auth-box">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    autoComplete="off"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

// Register component
function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(username, password);
    }

    return (
        <div className="auth-box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                    autoComplete="off"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    autoComplete="new-password"
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

function loadTasks(key) {
    const tasks = window.localStorage.getItem(key);
    return tasks ? JSON.parse(tasks) : [];
}

function App() {
    // State variables
    const [tasks, setTasksVar] = useState(loadTasks('tasks'));
    const [newTask, setNewTask] = useState('');
    const [newTaskTime, setNewTaskTime] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');
    const [editingTaskTime, setEditingTaskTime] = useState('');
    const [completedTasks, setCompletedTasksVar] = useState(
        loadTasks('completedTasks')
    );
    const [incompletedTasks, setIncompletedTasksVar] = useState(
        loadTasks('incompletedTasks')
    );
    const [activeDropdownId, setActiveDropdownId] = useState(null);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const [user, setUser] = useState(null);
    const [productivityChart, setChart] = useState(null);

    // Local Storage Functions
    function setTasks(args) {
        setTasksVar(args);
        window.localStorage.setItem('tasks', JSON.stringify(args));
    }

    function setCompletedTasks(args) {
        setCompletedTasksVar(args);
        window.localStorage.setItem('completedTasks', JSON.stringify(args));
    }

    function setIncompletedTasks(args) {
        setIncompletedTasksVar(args);
        window.localStorage.setItem('incompletedTasks', JSON.stringify(args));
    }

    // Import and export functions
    function handleImport() {
        const importInput = document.createElement('input');
        importInput.type = 'file';
        importInput.accept = 'application/json';

        importInput.onchange = e => {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0])

            reader.onload = readerEvent => {
                const data = JSON.parse(readerEvent.target.result);
                setTasks(data.tasks);
                setCompletedTasks(data.completedTasks);
                setIncompletedTasks(data.incompletedTasks);
            }
        }

        importInput.click();
    }

    function handleExport() {
        const exportLink = document.createElement('a');
        exportLink.href = URL.createObjectURL(new Blob([JSON.stringify({
            tasks: tasks,
            completedTasks: completedTasks,
            incompletedTasks: incompletedTasks,
        })], { type: 'application/json' }));
        exportLink.download = 'SchedulingStatistically.json'
        exportLink.click()
        URL.revokeObjectURL(exportLink.href);
    }

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
    function addTask(e) {
        e.preventDefault();
        if (newTask.trim() && newTaskTime.trim()) {
            const task = { 
                id: Date.now(), 
                text: newTask, 
                time: `${newTaskTime} minutes` 
            };
            setTasks([...tasks, task]);
            setNewTask('');
            setNewTaskTime('');
        }
    }

    // Function to delete a task
    function deleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id));
        setCompletedTasks(completedTasks.filter(task => task.id !== id));
        setIncompletedTasks(incompletedTasks.filter(task => task.id !== id));
    }

    // Function to edit a task
    function editTask(id, newText, newTime) {
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
    }

    // Function to start editing a task
    function startEditing(task) {
        setEditingTaskId(task.id);
        setEditingTaskText(task.text);
        setEditingTaskTime(task.time.replace(' minutes', ''));
    }

    // Function to mark a task as complete
    function completeTask(id) {
        const task = tasks.find(task => task.id === id);
        setCompletedTasks([...completedTasks, task]);
        setTasks(tasks.filter(task => task.id !== id));
    }

    // Function to mark a task as incomplete
    function incompleteTask(id, reason) {
        const task = tasks.find(task => task.id === id);
        setIncompletedTasks([...incompletedTasks, { ...task, reason }]);
        setTasks(tasks.filter(task => task.id !== id));
        setActiveDropdownId(null);
    }

    // Toggle dropdown menu
    function toggleDropdown(id, event) {
        event.stopPropagation();
        const rect = event.target.getBoundingClientRect();
        const position = {
            top: rect.top + window.scrollY + rect.height,
            left: rect.left + window.scrollX
        };
        setDropdownPosition(position);
        setActiveDropdownId(activeDropdownId === id ? null : id);
    }

    function closeDropdown() {
        setActiveDropdownId(null);
    }

    // Functions for handling login and registration
    async function handleLogin(username, password) {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            if (response.data.success) {
                setUser(username);
                setTasks(response.data.userData.tasks || []);
                setCompletedTasks(response.data.userData.completedTasks || []);
                setIncompletedTasks(response.data.userData.incompletedTasks || []);
                alert('Login successful!');
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
        }
    }

    async function handleRegister(username, password) {
        try {
            const userData = {
                tasks,
                completedTasks,
                incompletedTasks
            };
            const response = await axios.post(`${API_URL}/register`, { 
                username, 
                password, 
                userData 
            });
            if (response.data.success) {
                setUser(username);
                alert('Registration successful! You are now logged in.');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed. Please try again.');
        }
    }

    function handleLogout() {
        setUser(null);
        // Clear user data
        setTasks([]);
        setCompletedTasks([]);
        setIncompletedTasks([]);
    }

    // Add this effect to sync data with Airtable when it changes
    useEffect(() => {
        if (user) {
            const userData = {
                tasks,
                completedTasks,
                incompletedTasks
            };
            axios.post(`${API_URL}/sync`, { username: user, userData })
                .then(response => {
                    if (!response.data.success) {
                        console.error('Sync failed:', response.data.error);
                    }
                })
                .catch(error => console.error('Sync failed:', error));
        }
    }, [tasks, completedTasks, incompletedTasks, user]);

    useEffect(() => {
        // Configuration options
        const config = {
            type: 'line',
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Productivity Tracker: Completed vs Incomplete Tasks'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Number of Tasks'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Time (Days)'
                        }
                    }
                }
            },
        };

        // Create and render the chart
        setChart(new Chart(
            document.getElementById('productivityChart'),
            config
        ));
    }, []);

    useEffect(() => {
        if (!productivityChart) return;
        // Generate data for the last 30 days
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setMonth(date.getMonth() + 1);
        date.setDate(0);
        const labels = Array.from({ length: date.getDate() }, 
            (_, i) => `Day ${i + 1}`);

        const completedTaskData = Array(labels.length);
        const incompleteTaskData = Array(labels.length);

        date.setDate(1);
        const nextDate = new Date(date);
        nextDate.setDate(2);
        for (const thisMonth = date.getMonth(); 
            date.getMonth() === thisMonth; 
            (() => {
                date.setDate(date.getDate() + 1);
                nextDate.setDate(date.getDate() + 1);
            })()) {
            completedTaskData[date.getDate() - 1] =
                completedTasks.filter(({ id }) => 
                    id >= date.valueOf() && id < nextDate.valueOf()).length
            incompleteTaskData[date.getDate() - 1] =
                incompletedTasks.filter(({ id }) => 
                    id >= date.valueOf() && id < nextDate.valueOf()).length
        }

        // Data for the chart
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Completed Tasks',
                    data: completedTaskData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    tension: 0.1,
                    fill: true
                },
                {
                    label: 'Incomplete Tasks',
                    data: incompleteTaskData,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    tension: 0.1,
                    fill: true
                }
            ]
        };

        productivityChart.data = data;
        productivityChart.update();
    }, [productivityChart, completedTasks, incompletedTasks]);

    return (
        <div className="container">
            <div className="app-header">
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
                            <button type="AddTask">Add Task</button>
                        </form>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleImport}>Import</button>
                        <button onClick={handleExport}>Export</button>
                    </div>
                </div>
                <div className="auth-section">
                    {user ? (
                        <div className="user-info">
                            <p>Welcome, {user}!</p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <React.Fragment>
                            <Login onLogin={handleLogin} />
                            <Register onRegister={handleRegister} />
                        </React.Fragment>
                    )}
                </div>
            </div>
            <div className="task-lists">
                <div className="task-list-area">
                    <h2>Task List</h2>
                    <div className="task-list-scrollable">
                        <ul className="task-list">
                            {tasks.map(task => (
                                <li key={task.id} 
                                    className={`task-item ${editingTaskId === task.id ? 'editing' : ''}`}>
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
                                            <button onClick={() => editTask(task.id, editingTaskText, editingTaskTime)}>
                                                Save
                                            </button>
                                            <button onClick={() => setEditingTaskId(null)}>
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <span>{task.text}</span>
                                            {task.time && (
                                                <span style={{ marginLeft: '10px' }}>
                                                    {`${task.time}`}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    <div className="task-buttons">
                                        <button 
                                            className="complete-button" 
                                            onClick={() => completeTask(task.id)}>
                                            Complete
                                        </button>
                                        <div className="dropdown">
                                            <button 
                                                className="incomplete-button" 
                                                onClick={(e) => toggleDropdown(task.id, e)}>
                                                Incomplete
                                            </button>
                                            {activeDropdownId === task.id && (
                                                <DropdownMenu
                                                    task={task}
                                                    position={dropdownPosition}
                                                    incompleteReasons={incompleteReasons}
                                                    handleIncompleteTask={incompleteTask}
                                                    closeDropdown={closeDropdown}
                                                />
                                            )}
                                        </div>
                                        <button 
                                            className="edit-button" 
                                            onClick={() => startEditing(task)}>
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-button" 
                                            onClick={() => deleteTask(task.id)}>
                                            Delete
                                        </button>
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
                                        <span style={{ marginLeft: '10px' }}>
                                            {` ${task.time}`}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="incompleted-task-list-area">
                        <h2>Incomplete Tasks</h2>
                        <ul className="task-list">
                            {incompletedTasks.map(task => (
                                <li key={task.id} className="task-item">
                                    <div>
                                        <span>{task.text}</span>
                                        <span style={{ marginLeft: '10px' }}>
                                            {` ${task.time}`}
                                        </span>
                                        {task.reason && 
                                            <span className="incomplete-reason">
                                                Reason: {task.reason}
                                            </span>
                                        }
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <canvas id="productivityChart" />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
