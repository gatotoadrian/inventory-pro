// Simulated user database
const users = [];

function initAuth() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert('Login successful!');
        // Redirect to inventory page after successful login
        window.location.hash = '#inventory';
        loadPage('inventory');
    } else {
        alert('Invalid email or password');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (users.some(u => u.email === email)) {
        alert('Email already in use');
        return;
    }

    users.push({ name, email, password });
    alert('Sign up successful! Please log in.');
    // Redirect to login page after successful signup
    window.location.hash = '#login';
    loadPage('login');
}

// Initialize auth functionality
initAuth();