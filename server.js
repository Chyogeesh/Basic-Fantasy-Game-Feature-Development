const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Player = require('./models/Player'); // Player model
const Team = require('./models/Team');     // Team model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/fantasy_game', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Routes
app.get('/players', async (req, res) => {
    const players = await Player.find();
    res.json(players);
});

app.post('/teams', async (req, res) => {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.status(201).json(newTeam);
});

app.get('/teams/:id', async (req, res) => {
    const team = await Team.findById(req.params.id);
    res.json(team);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
