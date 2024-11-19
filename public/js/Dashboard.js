const { response } = require("express");
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.add('d-none'));
    // Show the selected section
    document.getElementById(sectionId).classList.remove('d-none');
}

async function logout() {
    try {
        const response = await fetch('http://localhost:6969/api/logout', {
            method: 'POST',
            mode: 'cors', // Ensure CORS mode is enabled
            headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        if (result.success) {
            // Clear localStorage and redirect to login page
            localStorage.removeItem('userid');
            window.location.href = '/public/login.html';
        } else {
            alert('Log out failed. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error('Error:', error);
    }
}

async function loadAdminName() {
    const userid = localStorage.getItem('userid');
    if (!userid) {
        alert('User not logged in. Redirecting to login page.');
        window.location.href = '/public/login.html';
        return;
    }

    try {
        const response = await fetch(`http://localhost:6969/api/GET/admin/${userid}`, {
            mode: 'cors',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const result = await response.json();
        if (response.ok && result.success) {
            // Display the admin name
            document.getElementById('AdminName').textContent = result.fullname;
        } else {
            console.error('Failed to fetch admin name:', result.message);
            alert('Failed to load admin name.');
        }
    } catch (error) {
        console.error('Error fetching admin name:', error);
    }
}



// Load admin name when the dashboard page loads
document.addEventListener('DOMContentLoaded', loadAdminName);
