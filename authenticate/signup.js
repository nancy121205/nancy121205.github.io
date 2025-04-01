document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    form.insertBefore(errorContainer, form.firstChild);

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const errors = [];

        // Clear previous errors
        errorContainer.innerHTML = '';
        
        // Get form inputs
        const fullname = document.getElementById('fullname').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validation checks
        // 1. Full Name
        if (fullname.length < 2) {
            errors.push('Full name must be at least 2 characters long');
        }

        // 2. Email
        if (!email.endsWith('@mes.ac.in')) {
            errors.push('Please use your college email (@mes.ac.in)');
        }

        // 3. Username
        if (username.length < 3) {
            errors.push('Username must be at least 3 characters long');
        }

        // 4. Password
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('Password must contain at least one number');
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        // 5. Confirm Password
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }

        // Display errors or submit form
        if (errors.length > 0) {
            displayErrors(errors);
        } else {
            form.submit();
        }
    });

    function displayErrors(errors) {
        const errorList = document.createElement('ul');
        errorList.className = 'error-list';
        errors.forEach(error => {
            const li = document.createElement('li');
            li.textContent = error;
            errorList.appendChild(li);
        });
        errorContainer.appendChild(errorList);
    }
});
