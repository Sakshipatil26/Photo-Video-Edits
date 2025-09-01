document.addEventListener("DOMContentLoaded", function() {
    // Select the login form
    const loginForm = document.querySelector('form');

    // Add event listener for form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Retrieve email and password values
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;

        // Simulate authentication (replace this with your own logic)
        const isAuthenticated = simulateAuthentication(email, password);

        if (isAuthenticated) {
            // Authentication successful, redirect to dashboard or another page
            window.location.href = 'main.html'; 
        } else {
            // Authentication failed, display error message
            alert('Authentication failed. Please check your credentials.');
        }
    });

    // Function to simulate authentication
    function simulateAuthentication(email, password) {
        // Simulate authentication logic here
        // For now, let's just return true to allow any email and password combination
        // In a real-world scenario, you would replace this with backend authentication
        return true;
    }
});
