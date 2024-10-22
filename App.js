import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await axios.get('/players');
            setPlayers(response.data);
        };
        fetchPlayers();
    }, []);

    const addPlayer = (player) => {
        if (selectedPlayers.length < 11) {
            setSelectedPlayers([...selectedPlayers, player]);
        } else {
            alert("You can only add up to 11 players.");
        }
    };

    const createTeam = async () => {
        await axios.post('/teams', { name: teamName, players: selectedPlayers });
        alert("Team created successfully!");
    };

    return (
        <div>
            <h1>Fantasy Team Manager</h1>
            <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <h2>Available Players
