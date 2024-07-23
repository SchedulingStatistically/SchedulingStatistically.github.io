const AIRTABLE_API_KEY = 'patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa';
const AIRTABLE_BASE_ID = 'appjMFSP6U6V4cwTO';

async function makeRequest(endpoint, method = 'GET', body = null) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${endpoint}`;
    const headers = {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
    };
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

async function authenticateUser(username, password) {
    const endpoint = `Users?filterByFormula=AND({Username}='${username}',{Password}='${password}')`;
    const data = await makeRequest(endpoint);
    return data.records.length > 0 ? data.records[0].id : null;
}

async function registerUser(username, password) {
    const endpoint = 'Users';
    const body = {
        fields: { Username: username, Password: password }
    };
    const data = await makeRequest(endpoint, 'POST', body);
    return data.id;
}

async function getTasks(userId) {
    const endpoint = `Tasks?filterByFormula={UserId}='${userId}'`;
    const data = await makeRequest(endpoint);
    return data.records.map(record => ({
        id: record.id,
        name: record.fields.Name,
        estimatedTime: record.fields.EstimatedTime,
        status: record.fields.Status,
        completedDate: record.fields.CompletedDate,
        incompleteReason: record.fields.IncompleteReason
    }));
}

async function addTask(userId, taskName, estimatedTime) {
    const endpoint = 'Tasks';
    const body = {
        fields: {
            Name: taskName,
            UserId: userId,
            EstimatedTime: parseInt(estimatedTime),
            Status: 'pending'
        }
    };
    const data = await makeRequest(endpoint, 'POST', body);
    return {
        id: data.id,
        name: data.fields.Name,
        estimatedTime: data.fields.EstimatedTime,
        status: data.fields.Status
    };
}

async function updateTask(taskId, updates) {
    const endpoint = `Tasks/${taskId}`;
    const body = { fields: updates };
    console.log('Updating task:', taskId, updates);
    try {
        const data = await makeRequest(endpoint, 'PATCH', body);
        console.log('Task updated successfully:', data);
        return {
            id: data.id,
            name: data.fields.Name,
            estimatedTime: data.fields.EstimatedTime,
            status: data.fields.Status,
            completedDate: data.fields.CompletedDate,
            incompleteReason: data.fields.IncompleteReason
        };
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
}

async function deleteTask(taskId) {
    const endpoint = `Tasks/${taskId}`;
    await makeRequest(endpoint, 'DELETE');
}

async function completeTask(taskId) {
    return updateTask(taskId, {
        Status: 'completed',
        CompletedDate: new Date().toISOString().split('T')[0] // Formal: YYYY-MM-DD
    });
}

async function markTaskIncomplete(taskId, reason) {
    try {
        const result = await updateTask(taskId, {
            Status: 'incompleted',
            IncompleteReason: reason
        });
        console.log('Task marked as incomplete:', result);
        return result;
    } catch (error) {
        console.error('Error marking task as incomplete:', error);
        throw error;
    }
}

async function editTask(taskId, newName, newEstimatedTime) {
    return updateTask(taskId, {
        Name: newName,
        EstimatedTime: parseInt(newEstimatedTime)
    });
}

async function getLastThirtyDaysData(userId) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const formattedDate = thirtyDaysAgo.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    const filterFormula = `AND({UserId}='${userId}', IS_AFTER({CompletedDate}, '${formattedDate}'))`;
    const endpoint = `Tasks?filterByFormula=${encodeURIComponent(filterFormula)}`;

    try {
        const data = await makeRequest(endpoint);
        return data.records.map(record => ({
            status: record.fields.Status,
            completedDate: record.fields.CompletedDate
        }));
    } catch (error) {
        console.error('Error fetching last 30 days data:', error);
        throw error;
    }
}


// Export functions to be used in app.js
export {
    authenticateUser,
    registerUser,
    getTasks,
    addTask,
    completeTask,
    markTaskIncomplete,
    editTask,
    deleteTask,
	getLastThirtyDaysData
};