const express = require('express');
const path = require('path');
const fs = require('fs');
const data = require('../../../db/db.json');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
  });
  
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
app.get('/api/notes', (req, res) => {
    return res.json(data);
  });
  
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    
    data.push(newNote);
  
    res.json(data);
  });

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
  