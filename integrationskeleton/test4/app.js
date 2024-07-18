import {
    authenticateUser,
    registerUser,
    getTasks,
    addTask,
    completeTask,
    markTaskIncomplete,
    editTask,
    deleteTask,
	getLastThirtyDaysData
} from './airtable-api.js';

let currentUserId = null;
let tasks = [];

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const taskForm = document.getElementById('task-form');
    const importBtn = document.getElementById('import-btn');
    const exportBtn = document.getElementById('export-btn');

    if (loginBtn) {
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;
            
            const userId = await authenticateUser(username, password);
            if (userId) {
                currentUserId = userId;
                updateUIForLoginStatus(true);
            } else {
                alert('Invalid credentials');
            }
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            
            const userId = await registerUser(username, password);
            if (userId) {
                currentUserId = userId;
                updateUIForLoginStatus(true);
            } else {
                alert('Registration failed');
            }
        });
    }

    if (taskForm) {
        taskForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const taskName = document.getElementById('new-task').value;
            const estimatedTime = document.getElementById('estimated-time').value;
            await addTask(currentUserId, taskName, estimatedTime);
            document.getElementById('new-task').value = '';
            document.getElementById('estimated-time').value = '';
            loadTasks();
        });
    }

    if (importBtn) {
        importBtn.addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = '.json';
            fileInput.onchange = (event) => {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = async (e) => {
                    const tasks = JSON.parse(e.target.result);
                    for (const task of tasks) {
                        await addTask(currentUserId, task.name, task.estimatedTime);
                    }
                    loadTasks();
                };
                reader.readAsText(file);
            };
            fileInput.click();
        });
    }

    if (exportBtn) {
        exportBtn.addEventListener('click', async () => {
            const tasks = await getTasks(currentUserId);
            const tasksJson = JSON.stringify(tasks, null, 2);
            const blob = new Blob([tasksJson], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tasks.json';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    // Initial UI setup
    updateUIForLoginStatus(false);
});

async function loadTasks() {
    try {
        tasks = await getTasks(currentUserId);
        renderTasks();
    } catch (error) {
        console.error('Error loading tasks:', error);
        alert('Failed to load tasks. Please try again.');
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    const completedTaskList = document.getElementById('completed-task-list');
    const incompletedTaskList = document.getElementById('incompleted-task-list');
    
    taskList.innerHTML = '';
    completedTaskList.innerHTML = '';
    incompletedTaskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = `${task.name} (${task.estimatedTime} min)`;
        
        const buttonsDiv = document.createElement('div');
        
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = () => completeTaskHandler(task.id);
        
        const incompleteBtn = document.createElement('button');
        incompleteBtn.textContent = 'Incomplete';
        incompleteBtn.onclick = () => markTaskIncompleteHandler(task.id);
        
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editTaskHandler(task.id);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTaskHandler(task.id);
        
        buttonsDiv.appendChild(completeBtn);
        buttonsDiv.appendChild(incompleteBtn);
        buttonsDiv.appendChild(editBtn);
        buttonsDiv.appendChild(deleteBtn);
        
        li.appendChild(buttonsDiv);
        
        if (task.status === 'completed') {
            completedTaskList.appendChild(li);
        } else if (task.status === 'incompleted') {
            incompletedTaskList.appendChild(li);
        } else {
            taskList.appendChild(li);
        }
    });
}

let productivityChart = null;

async function updateProductivityChart() {
    if (!currentUserId) return;

    const ctx = document.getElementById('productivityChart');
    
    // Check if productivityChart is a Chart instance before trying to destroy it
    if (productivityChart instanceof Chart) {
        productivityChart.destroy();
    }
    
    try {
        const thirtyDaysData = await getLastThirtyDaysData(currentUserId);
        
        const labels = Array.from({length: 30}, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - 29 + i);
            return d.toISOString().split('T')[0];
        });

        const completedData = new Array(30).fill(0);
        const incompletedData = new Array(30).fill(0);

        thirtyDaysData.forEach(item => {
            const index = labels.indexOf(item.completedDate);
            if (index !== -1) {
                if (item.status === 'completed') {
                    completedData[index]++;
                } else if (item.status === 'incompleted') {
                    incompletedData[index]++;
                }
            }
        });

        productivityChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Completed Tasks',
                        data: completedData,
                        borderColor: 'rgba(75, 192, 192, 1)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.1
                    },
                    {
                        label: 'Incomplete Tasks',
                        data: incompletedData,
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
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
                            text: 'Date'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Productivity Tracker: Completed vs Incomplete Tasks (Last 30 Days)'
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error updating productivity chart:', error);
        alert('Failed to update the productivity chart. Please try again.');
    }
}

// Create the update chart button
function createUpdateChartButton() {
    const existingButton = document.getElementById('update-chart-btn');
    if (existingButton) {
        existingButton.remove();
    }
    
    const button = document.createElement('button');
    button.textContent = 'Update Chart';
    button.id = 'update-chart-btn';
    button.onclick = updateProductivityChart;
    document.querySelector('.planner').appendChild(button);
}


async function completeTaskHandler(taskId) {
    await completeTask(taskId);
    loadTasks();
}

async function markTaskIncompleteHandler(taskId) {
    const reason = prompt('Why was this task not completed?');
    if (reason) {
        try {
            await markTaskIncomplete(taskId, reason);
            await loadTasks();
        } catch (error) {
            console.error('Error marking task as incomplete:', error);
            alert('Failed to mark task as incomplete. Please try again.');
        }
    }
}

async function editTaskHandler(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newName = prompt('Enter new task name:', task.name);
    const newEstimatedTime = prompt('Enter new estimated time (minutes):', task.estimatedTime);
    if (newName && newEstimatedTime) {
        await editTask(taskId, newName, newEstimatedTime);
        loadTasks();
    }
}

async function deleteTaskHandler(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        await deleteTask(taskId);
        loadTasks();
    }
}

function updateUIForLoginStatus(isLoggedIn) {
    const authSection = document.querySelector('.auth-section');
    const taskManagementSection = document.querySelector('.task-lists');
    const plannerSection = document.querySelector('.planner');
    const chartContainer = document.querySelector('.chart-container');

    if (isLoggedIn) {
        if (authSection) authSection.style.display = 'none';
        if (taskManagementSection) taskManagementSection.style.display = 'flex';
        if (plannerSection) plannerSection.style.display = 'block';
        if (chartContainer) chartContainer.style.display = 'block';
        createUpdateChartButton();
        updateProductivityChart();
        loadTasks();
    } else {
        if (authSection) authSection.style.display = 'block';
        if (taskManagementSection) taskManagementSection.style.display = 'none';
        if (plannerSection) plannerSection.style.display = 'none';
        if (chartContainer) chartContainer.style.display = 'none';
        const updateChartBtn = document.getElementById('update-chart-btn');
        if (updateChartBtn) updateChartBtn.remove();
    }
}