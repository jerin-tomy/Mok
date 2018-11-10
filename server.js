const express    = require('express')
const bodyParser = require('body-parser')
const cors       = require('cors')
const Chatkit    = require('@pusher/chatkit-server');

const app = express()

// TODO: move these keys to their own files and require them instead
const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:8ad4514e-c45c-4a94-9abc-b0a81ab73f82',
  key: '7e82b79e-afe3-43d2-9c71-9fe627a1154c:DhP5R1Se+m1NtkOzhh8xHGt/lXu0+P8qyeOcCIjRfBA='
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// CREATE USER route
app.post('/users', (req, res) => {
  const {username} = req.body;
  chatkit.createUser({
    id: username,
    name: username
  }).then(() => res.sendStatus(201)).catch(error => {
    if(error.error_type === 'services/chatkit/user_already/exists'){
      res.sendStatus(200);
    }
    else{
      res.staus(error.status).json(error);
    }
  });
});

app.post('authenticate', (req, res) => {
  const authData = chatkit.authenticate({userId: req.query.user_id});
  res.status(authData.status).send(authData.body);
});

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
