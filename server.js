const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection:{
        host: '127.0.0.1',
        user: 'postgres',
        password: 'superPW',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send(database.users);
});

app.post('/signin', (req,res) => {
    console.log(req.body);
    req.body.email === database.users[0].email 
        && req.body.password === database.users[0].password
        ?   res.json(database.users[0])
        :   res.status(400).json('faiure')
    
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;
    db('users')
    .returning('*')
    .insert({
        email: email,
        name: name,
        joined: new Date()
    })
    .then(response => {
        res.json(response);
    });
});

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    const user = verifyUserID(id);
    user ? res.json(user) : res.status(404).json('User not found');
});

app.put('/image', (req,res) => {
    const {id} = req.body;
    const user = verifyUserID(id);
    if(user){
        console.log("submit", user);
        return res.json({entries:++user.entries});
    }else{
        return res.status(400).json('User not found');
    }
});

const verifyUserID = (id) => {
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            console.log(true);
            found = user;
        }
    });
    return found;
}

const port = 3001;
app.listen(port, () => {
    console.log("server ready on", port)
});

