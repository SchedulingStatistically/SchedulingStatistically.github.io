const textForm = document.getElementById('text-form');
const textInput = document.getElementById('text-input');
const submitBtn = document.getElementById('submit-btn');
const inputList = document.getElementById('input-list');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

let currentUser = null;

function enableTextSubmission() {
    textInput.disabled = false;
    submitBtn.disabled = false;
}

function disableTextSubmission() {
    textInput.disabled = true;
    submitBtn.disabled = true;
}

function authenticateUser(username, password, isRegistering = false) {
    const endpoint = isRegistering ? 'https://api.airtable.com/v0/appjMFSP6U6V4cwTO/Users' : 'https://api.airtable.com/v0/appjMFSP6U6V4cwTO/Users?filterByFormula={Username}="' + encodeURIComponent(username) + '"';
    
    return fetch(endpoint, {
        method: isRegistering ? 'POST' : 'GET',
        headers: {
            'Authorization': 'Bearer patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa',
            'Content-Type': 'application/json'
        },
        body: isRegistering ? JSON.stringify({
            records: [{
                fields: {
                    Username: username,
                    Password: password
                }
            }]
        }) : null
    })
    .then(response => response.json())
    .then(data => {
        if (isRegistering) {
            return data.records[0];
        } else {
            return data.records.length > 0 && data.records[0].fields.Password === password ? data.records[0] : null;
        }
    });
}

loginBtn.addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    authenticateUser(username, password)
        .then(user => {
            if (user) {
                currentUser = user;
                alert('Logged in successfully!');
                enableTextSubmission();
                loadUserTexts(user.id);
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(error => console.error('Error:', error));
});

registerBtn.addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    
    authenticateUser(username, password, true)
        .then(user => {
            currentUser = user;
            alert('Registered successfully!');
            enableTextSubmission();
            // Create initial text for the new user
            createText(user.id, 'Welcome! This is your first text.');
        })
        .catch(error => console.error('Error:', error));
});

function loadUserTexts(userId) {
    fetch(`https://api.airtable.com/v0/appjMFSP6U6V4cwTO/Tasks?filterByFormula={UserId}="${userId}"`, {
        headers: {
            'Authorization': 'Bearer patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa'
        }
    })
    .then(response => response.json())
    .then(data => {
        inputList.innerHTML = '';
        data.records.forEach(record => {
            const listItem = document.createElement('li');
            listItem.textContent = record.fields.Name;
            inputList.appendChild(listItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

function createText(userId, text) {
    const record = {
        fields: {
            UserId: userId,
            Name: text
        }
    };
    
    return fetch('https://api.airtable.com/v0/appjMFSP6U6V4cwTO/Tasks', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ records: [record] })
    })
    .then(response => response.json())
    .then(data => data.records[0]);
}

textForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = textInput.value.trim();
    if (userInput !== '' && currentUser) {
        createText(currentUser.id, userInput)
            .then(newRecord => {
                const listItem = document.createElement('li');
                listItem.textContent = newRecord.fields.Name;
                inputList.appendChild(listItem);
                textInput.value = '';
            })
            .catch(error => console.error('Error:', error));
    }
});