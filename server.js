const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static('public'));

const PORT = 3000;

const jumpRequests = {}; // { "username|password": true }

app.post('/jump', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send("username o password mancanti");

  const key = username + "|" + password;
  jumpRequests[key] = true;
  console.log(`Salto richiesto da ${username}`);
  res.sendStatus(200);
});

app.get('/jump/:username/:password', (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  const key = username + "|" + password;

  if (jumpRequests[key]) {
    jumpRequests[key] = false;
    res.json({ jump: true });
  } else {
    res.json({ jump: false });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server avviato su http://0.0.0.0:${PORT}`);
});
