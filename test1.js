
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const datasetPath = 'C:/Users/Harsh Sharma/js_proj_01/dummy_dataset_1000.json';
let users = require(datasetPath);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Helper to add user
function addUser(userData, res, isApi) {
    const nextId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = {
        ...userData,
        id: nextId
    };

    users.push(newUser);
    fs.writeFile(datasetPath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            const errorMsg = isApi ? { message: 'Failed to save user' } : '<h1>Error saving user</h1>';
            return res.status(500).send(errorMsg);
        }

        if (isApi) {
            res.status(201).json({ message: 'User added', user: newUser });
        } else {
            res.redirect('/user');
        }
    });
}

// Render-friendly name getter
function getDisplayName(user) {
    return user.name || `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'No Name';
}

// ----------- BROWSER ROUTES -----------
app.get('/user', (req, res) => {
    const isApi = req.headers.accept && req.headers.accept.includes('application/json');

    if (isApi) {
        res.json(users);
    } else {
        let html = `<h1>All Users</h1><ul>`;
        users.forEach(user => {
            const name = getDisplayName(user);
            html += `<li><a href="/user/${user.id}">${name}</a></li>`;
        });
        html += `</ul>
        <h2>Add a User</h2>
        <form action="/user" method="POST">
            <input type="text" name="name" placeholder="Full Name" />
            <input type="text" name="first_name" placeholder="First Name" />
            <input type="text" name="last_name" placeholder="Last Name" />
            <input type="email" name="email" placeholder="Email" required />
            <input type="number" name="age" placeholder="Age" />
            <button type="submit">Add User</button>
        </form>`;
        res.send(html);
    }
});

app.post('/user', (req, res) => {
    const isApi = req.headers.accept && req.headers.accept.includes('application/json');

    const { name, first_name, last_name, email } = req.body;
    if (!email || (!name && !first_name && !last_name)) {
        const msg = isApi ? { message: 'Name or first/last name + Email are required' } : '<h1>Missing Required Fields</h1>';
        return res.status(400).send(msg);
    }

    addUser(req.body, res, false);
});

app.get('/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    const isApi = req.headers.accept && req.headers.accept.includes('application/json');

    if (!user) {
        return isApi
            ? res.status(404).json({ message: 'User not found' })
            : res.status(404).send('<h1>User Not Found</h1>');
    }

    const name = getDisplayName(user);

    if (isApi) {
        res.json(user);
    } else {
        res.send(`
            <h1>${name}</h1>
            <p>Email: ${user.email}</p>
            <p>Age: ${user.age || 'N/A'}</p>
            <a href="/user">Go Back</a>
        `);
    }
});

// ----------- PURE API ROUTES -----------
app.get('/api/user', (req, res) => {
    res.json(users);
});

app.post('/api/user', (req, res) => {
    const { name, first_name, last_name, email } = req.body;
    if (!email || (!name && !first_name && !last_name)) {
        return res.status(400).json({ message: 'Name or first/last name + Email are required' });
    }

    addUser(req.body, res, true);
});

app.get('/api/user/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
});

// ----------- START SERVER -----------
app.listen(3000, () => {
    console.log('Hybrid server running at http://localhost:3000');
});
