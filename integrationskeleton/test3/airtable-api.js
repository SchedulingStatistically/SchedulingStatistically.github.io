const AIRTABLE_API_KEY = 'patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa';
const AIRTABLE_BASE_ID = 'appjMFSP6U6V4cwTO';

async function authenticateUser(username, password) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Users`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    const user = data.records.find(record => record.fields.Username === username && record.fields.Password === password);
    return user ? user.id : null;
}

async function registerUser(username, password) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Users`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Username: username,
                Password: password
            }
        })
    });
    const data = await response.json();
    return data.id;
}

async function getTasks(userId) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks?filterByFormula={UserId}='${userId}'`;
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        }
    });
    const data = await response.json();
    return data.records.map(record => ({
        id: record.id,
        name: record.fields.Name
    }));
}

async function addTask(userId, taskName) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                Name: taskName,
                UserId: userId
            }
        })
    });
    const data = await response.json();
    return {
        id: data.id,
        name: data.fields.Name
    };
}

async function deleteTask(taskId) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Tasks/${taskId}`;
    await fetch(url, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        }
    });
}