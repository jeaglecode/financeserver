const express = require('express');
const fs = require('fs');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.all('/', (req, res) => {
    console.log('Just got a request!');
    res.send('Yo!');
});

app.post('/users', (req, res) => {
    const user = req.body;
    saveUsers(user);
    res.status(201).json(user);
});

// New GET route for fetching users
app.get('/users', (req, res) => {
    const users = getUsers();
    res.status(200).json(users);
});

function saveUsers(user) {
    const data = JSON.stringify(user);
    fs.writeFileSync('users.json', data);
    console.log('from server wrote ' + JSON.stringify(user) + ' to file.');
}

// New function for reading users from file
function getUsers() {
    const data = fs.readFileSync('users.json', 'utf8');
    return JSON.parse(data);
}

app.listen(process.env.PORT || 3000);
console.log(`Server started at PORT ${process.env.PORT || 3000}`);
