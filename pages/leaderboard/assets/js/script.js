const players = JSON.parse(localStorage.getItem('players')) || []; // Load players from localStorage

let sortState = {
    name: 'asc',
    score: 'desc',
    level: 'desc'
};

function sortPlayers(criteria) {
    let sortedPlayers = [...players];

    sortedPlayers.sort((a, b) => {
        if (criteria === 'name') {
            return sortState[criteria] === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        } else {
            return sortState[criteria] === 'asc' ? a[criteria] - b[criteria] : b[criteria] - a[criteria];
        }
    });

    return sortedPlayers;
}

function updateSortIcons(criteria) {
    document.querySelectorAll('.sort-icon').forEach(icon => icon.textContent = '▲'); // Reset icons
    let icon = document.querySelector(`#sortBy${criteria.charAt(0).toUpperCase() + criteria.slice(1)} .sort-icon`);
    icon.textContent = sortState[criteria] === 'asc' ? '▲' : '▼';
}

function displayLeaderboard(sortedPlayers) {
    const leaderboardBody = document.querySelector('#leaderboard tbody');
    leaderboardBody.innerHTML = '';

    sortedPlayers.forEach((player, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        if (index === 0) nameCell.classList.add('medal-gold');
        else if (index === 1) nameCell.classList.add('medal-silver');
        else if (index === 2) nameCell.classList.add('medal-bronze');
        nameCell.textContent = player.name;

        const scoreCell = document.createElement('td');
        scoreCell.textContent = player.score;

        const levelCell = document.createElement('td');
        levelCell.textContent = player.level;

        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        row.appendChild(levelCell);

        leaderboardBody.appendChild(row);
    });
}

// Event listeners for sorting columns
document.querySelector('#sortByName').addEventListener('click', () => {
    sortState.name = sortState.name === 'asc' ? 'desc' : 'asc';
    displayLeaderboard(sortPlayers('name'));
    updateSortIcons('name');
});

document.querySelector('#sortByScore').addEventListener('click', () => {
    sortState.score = sortState.score === 'asc' ? 'desc' : 'asc';
    displayLeaderboard(sortPlayers('score'));
    updateSortIcons('score');
});

document.querySelector('#sortByLevel').addEventListener('click', () => {
    sortState.level = sortState.level === 'asc' ? 'desc' : 'asc';
    displayLeaderboard(sortPlayers('level'));
    updateSortIcons('level');
});

document.querySelector('#addPlayer').addEventListener('click', () => {
    const name = document.querySelector('#playerName').value.trim();
    const score = parseInt(document.querySelector('#playerScore').value);
    const level = parseInt(document.querySelector('#playerLevel').value);

    if (name && !isNaN(score) && !isNaN(level)) {
        players.push({ name, score, level });
        localStorage.setItem('players', JSON.stringify(players));

        displayLeaderboard(sortPlayers('name'));
        updateSortIcons('name');

        document.querySelector('#playerName').value = '';
        document.querySelector('#playerScore').value = '';
        document.querySelector('#playerLevel').value = '';
    } else {
        alert('Please fill in all fields correctly.');
    }
});

// Initial display
displayLeaderboard(sortPlayers('name'));
updateSortIcons('name');
