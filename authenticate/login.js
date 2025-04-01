document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    alert('Login successful! Redirecting to home page...');
    window.location.href = '../home_page.html'; // Redirect to home page
});
