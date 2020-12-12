const express = require('express');
const path = require('path');
const fs = require('fs');
const data  = require('../../../db/db.json');
const { nanoid } = require('nanoid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(express.static('./Develop/public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../notes.html'));
  });
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
  
app.get('/api/notes', (req, res) => {
    return res.json(data);
  });
  
app.post('/api/notes', (req, res) => {
    const newNote = req.body;

    req.body.id = nanoid(10);

    data.push(newNote);
  
    res.json(data);
  });

app.delete('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const index = data.findIndex(p => p.id == id)
    data.splice(index,1);
    return res.send();
  });

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
  