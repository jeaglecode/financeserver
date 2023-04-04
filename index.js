const express = require('express')
const fs = require('fs')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.post('/users', (req, res) => {
    const user = req.body;
    // const users = getUsers();
    // users(user);
    saveUsers(user);
    res.status(201).json(user);
});

function saveUsers(user) {
    const data = JSON.stringify(user);
    fs.writeFileSync('users.json', data);
    console.log(user)
}


app.listen(process.env.PORT || 3000)
console.log(`Server started at PORT ${process.env.PORT || 3000}`);