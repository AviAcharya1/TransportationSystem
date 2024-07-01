// Sample data (replace this with your actual data)
const transports = [
    { id: 1, mode: 'road', name: 'City Bus', route: 'Downtown - Suburb', schedule: 'Every 15 minutes', cost: 2.50, accessibility: 'Wheelchair accessible' },
    { id: 2, mode: 'rail', name: 'Metro', route: 'North - South Line', schedule: 'Every 10 minutes', cost: 3.00, accessibility: 'Elevators at all stations' },
    { id: 3, mode: 'air', name: 'Local Airline', route: 'City A - City B', schedule: 'Daily at 10:00 AM', cost: 150.00, accessibility: 'Special assistance available' }
];

// Function to render the home view
function renderHome() {
    return `
        <h2>Welcome to the Transportation Information System</h2>
        <p>This system provides information about various modes of transportation including road, rail, air, and sea.</p>
    `;
}

// Function to render the transports list
function renderTransports() {
    let html = '<h2>Transport List</h2><ul class="transport-list">';
    transports.forEach(transport => {
        html += `
            <li class="transport-item">
                <h3>${transport.name}</h3>
                <p>Mode: ${transport.mode}</p>
                <p>Route: ${transport.route}</p>
                <p>Schedule: ${transport.schedule}</p>
                <p>Cost: $${transport.cost.toFixed(2)}</p>
                <p>Accessibility: ${transport.accessibility}</p>
            </li>
        `;
    });
    html += '</ul>';
    return html;
}

// Function to render the add new transport form
function renderAddForm() {
    return `
        <h2>Add New Transport</h2>
        <form id="add-transport-form">
            <label for="mode">Mode:</label>
            <select id="mode" required>
                <option value="road">Road</option>
                <option value="rail">Rail</option>
                <option value="air">Air</option>
                <option value="sea">Sea</option>
            </select>

            <label for="name">Name:</label>
            <input type="text" id="name" required>

            <label for="route">Route:</label>
            <input type="text" id="route" required>

            <label for="schedule">Schedule:</label>
            <input type="text" id="schedule">

            <label for="cost">Cost:</label>
            <input type="number" id="cost" step="0.01">

            <label for="accessibility">Accessibility:</label>
            <input type="text" id="accessibility">

            <button type="submit">Add Transport</button>
        </form>
    `;
}

// Function to handle view changes
function changeView(view) {
    const mainContent = document.getElementById('main-content');
    switch(view) {
        case 'home':
            mainContent.innerHTML = renderHome();
            break;
        case 'transports':
            mainContent.innerHTML = renderTransports();
            break;
        case 'add':
            mainContent.innerHTML = renderAddForm();
            setupFormSubmission();
            break;
    }
}

// Function to setup form submission
function setupFormSubmission() {
    const form = document.getElementById('add-transport-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const newTransport = {
            id: transports.length + 1,
            mode: document.getElementById('mode').value,
            name: document.getElementById('name').value,
            route: document.getElementById('route').value,
            schedule: document.getElementById('schedule').value,
            cost: parseFloat(document.getElementById('cost').value),
            accessibility: document.getElementById('accessibility').value
        };
        transports.push(newTransport);
        alert('New transport added successfully!');
        changeView('transports');
    });
}

// Event listeners for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            changeView(this.dataset.view);
        });
    });

    // Initially load the home view
    changeView('home');
});