const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');

const app = express();
app.use(bodyParser.json());

const database = {
    users:[{
        id:'123',
        name: 'John',
        email: 'john@gmail.com',
        password: '3',
        entries: 0,
        joined: new Date()
    },
    {
        id:'124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: '4',
        entries: 0,
        joined: new Date()
    }]
}

app.get('/', (req,res) => {
    res.send(database.users);
});

app.post('/signin', (req,res) => {
    console.log(req.body);
    req.body.email === database.users[0].email 
        && req.body.password === database.users[0].password
        ?   res.json('success')
        :   res.status(400).json('faiure')
    
});

app.post('/register', (req, res) => {
    const {email, name, password} = req.body;

    bcrypt.hash(password, null, null, (err, hash) => {
        console.log(hash);
    });

    database.users.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    res.json(`welcome ${database.users[database.users.length - 1].name}`);
});

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    const user = verifyUser(id);
    user ? res.json(user) : res.status(404).json('User not found');
});

app.put('/image', (req,res) => {
    const {id} = req.body;
    const user = verifyUser(id);
    if(user){
        return res.json(++user.entries)
    }else{
        return res.status(400).json('User not found');
    }
});

const verifyUser = (id) => {
    let found = false;
    database.users.forEach(user => {
        console.log(typeof user.id, user.id, typeof id, id);
        if(user.id === id) {
            console.log(true);
            found = user;
        }
    });
    return found;
}

const port = 3000;
app.listen(port, () => {
    console.log("server ready on", port)
});

