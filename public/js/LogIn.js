document.querySelector('#loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const usernameInput = document.getElementById('UserId');
    const passwordInput = document.getElementById('Password');
    let username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        document.getElementById('loginResult').textContent = 'Please fill in all fields.';
        return;
    }

    username = username.toUpperCase(); // Convert username to uppercase

    try {
        const response = await fetch('http://localhost:6969/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();
        if (result.success) {
            localStorage.setItem('userid', username); // Save userid for later use
            window.location.href = '/public/Dashboard.html';
        } else {
            document.getElementById('loginResult').textContent = result.alert;
        }
    } catch (error) {
        document.getElementById('loginResult').textContent = 'An error occurred. Please try again.';
        console.error('Error during login:', error);
    }
});
