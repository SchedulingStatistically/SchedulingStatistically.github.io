let currentUserId = null;

document.getElementById('auth-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    let userId = await authenticateUser(username, password);
    if (!userId) {
        userId = await registerUser(username, password);
    }
    
    currentUserId = userId;
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    loadTasks();
});

document.getElementById('task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskName = document.getElementById('task-name').value;
    await addTask(currentUserId, taskName);
    document.getElementById('task-name').value = '';
    loadTasks();
});

async function loadTasks() {
    const tasks = await getTasks(currentUserId);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.name;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = async () => {
            await deleteTask(task.id);
            loadTasks();
        };
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
    updateProductivityChart(tasks);
}

function updateProductivityChart(tasks) {
    const ctx = document.getElementById('productivity-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tasks'],
            datasets: [{
                label: '# of Tasks',
                data: [tasks.length],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}