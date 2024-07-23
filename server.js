// server.js

const express = require('express');
const Airtable = require('airtable');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;
const AIRTABLE_API_KEY = 'patuyBWMIypYphVl4.e5174b86499f75093a1a61fd33229b59fbd446849e75024337d0b469ebc1edaa';
const AIRTABLE_BASE_ID = 'appjMFSP6U6V4cwTO';

app.use(express.json());

// CORS configuration for GitHub Pages interaction with Render backend
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'https://schedulingstatistically.github.io',
            'http://localhost:8000'
        ];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

const base = new Airtable({apiKey: AIRTABLE_API_KEY}).base(AIRTABLE_BASE_ID);

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function registerUser(req, res) {
    const { username, password, userData } = req.body;
    
    try {
        const existingUsers = await base('Users').select({
            filterByFormula: `{Username} = '${username}'`
        }).firstPage();

        if (existingUsers.length > 0) {
            return res.json({ success: false, error: 'Username already exists' });
        }

        await base('Users').create([
            {
                fields: {
                    Username: username,
                    Password: password,
                    UserData: JSON.stringify(userData)
                }
            }
        ]);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Registration failed' });
    }
}

/**
 * Log in a user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function loginUser(req, res) {
    const { username, password } = req.body;
    
    try {
        const users = await base('Users').select({
            filterByFormula: `AND({Username} = '${username}', {Password} = '${password}')`
        }).firstPage();

        if (users.length === 0) {
            return res.json({ success: false, error: 'Invalid credentials' });
        }

        const userData = JSON.parse(users[0].fields.UserData || '{}');
        res.json({ success: true, userData });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Login failed' });
    }
}

/**
 * Sync user data
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function syncUserData(req, res) {
    const { username, userData } = req.body;
    
    try {
        const users = await base('Users').select({
            filterByFormula: `{Username} = '${username}'`
        }).firstPage();

        if (users.length === 0) {
            return res.json({ success: false, error: 'User not found' });
        }

        await base('Users').update([
            {
                id: users[0].id,
                fields: {
                    UserData: JSON.stringify(userData)
                }
            }
        ]);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Sync failed' });
    }
}

// Route handlers
app.post('/register', registerUser);
app.post('/login', loginUser);
app.post('/sync', syncUserData);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
