const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());

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
    }],
    logins:[{
        id:'123',
        name: 'John',
        hash: ''
    }]
}

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
    console.log("server Post", req.body);
    let hashedPW = '';
    bcrypt.hash(password, null, null, (err, hash) => {
        hashedPW = hash;
    });

    database.users.push({
        id:'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    });
    database.logins.push({
        id:'125',
        name: name,
        hash: hashedPW
    });
    res.json(database.users[database.users.length - 1]);
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

