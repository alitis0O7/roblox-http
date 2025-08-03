const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let jumpRequests = {}; // { username: password }

app.get('/', (req, res) => {
  res.send('Server Roblox attivo!');
});

app.post('/jump', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Missing username or password');
  jumpRequests[username] = password;
  res.send({ ok: true });
});

app.get('/jump/:username/:password', (req, res) => {
  const { username, password } = req.params;
  if (jumpRequests[username] && jumpRequests[username] === password) {
    delete jumpRequests[username];
    return res.json({ jump: true });
  }
  res.json({ jump: false });
});

app.listen(port, () => {
  console.log(`Server attivo su porta ${port}`);
});
