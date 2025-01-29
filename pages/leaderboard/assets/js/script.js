const players = JSON.parse(localStorage.getItem('players')) || []; // Load players from localStorage, if available

function sortPlayers(criteria) {
    let sortedPlayers;
    if (criteria === 'name') {
        sortedPlayers = [...players].sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'score') {
        sortedPlayers = [...players].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
    } else if (criteria === 'level') {
        sortedPlayers = [...players].sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
    }
    return sortedPlayers;
}

function displayLeaderboard(sortedPlayers) {
    const leaderboardBody = document.querySelector('#leaderboard tbody');
    leaderboardBody.innerHTML = '';

    sortedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');

        // Create a name cell and assign the medal class if applicable
        const nameCell = document.createElement('td');
        if (index === 0) nameCell.classList.add('medal-gold');
        else if (index === 1) nameCell.classList.add('medal-silver');
        else if (index === 2) nameCell.classList.add('medal-bronze');
        nameCell.textContent = player.name;

        // Create other cells
        const scoreCell = document.createElement('td');
        scoreCell.textContent = player.score;

        const levelCell = document.createElement('td');
        levelCell.textContent = player.level;

        // Append cells to the row
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        row.appendChild(levelCell);

        // Append row to the table body
        leaderboardBody.appendChild(row);
    });
}

document.querySelector('#sortCriteria').addEventListener('change', (event) => {
    const selectedCriteria = event.target.value;
    const sortedPlayers = sortPlayers(selectedCriteria);
    displayLeaderboard(sortedPlayers);
});

document.querySelector('#addPlayer').addEventListener('click', () => {
    const name = document.querySelector('#playerName').value.trim();
    const score = parseInt(document.querySelector('#playerScore').value);
    const level = parseInt(document.querySelector('#playerLevel').value);

    if (name && !isNaN(score) && !isNaN(level)) {
        players.push({ name, score, level });
        
        // Save players to localStorage
        localStorage.setItem('players', JSON.stringify(players));

        const sortedPlayers = sortPlayers(document.querySelector('#sortCriteria').value);
        displayLeaderboard(sortedPlayers);

        // Clear input fields
        document.querySelector('#playerName').value = '';
        document.querySelector('#playerScore').value = '';
        document.querySelector('#playerLevel').value = '';
    } else {
        alert('Please fill in all fields correctly.');
    }
});

// Initial display
displayLeaderboard(sortPlayers('name'));
