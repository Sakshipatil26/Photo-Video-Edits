document.addEventListener("DOMContentLoaded", function() {
    const signUpForm = document.querySelector('.signup-box form');

    signUpForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;
        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;
        const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

        // Perform client-side validation
        if (!validateForm(firstName, lastName, email, password, confirmPassword)) {
            return;
        }

        // Store a flag indicating successful sign-up
        localStorage.setItem('signedUp', true);

        // Optionally, you can reset the form after successful submission
        signUpForm.reset();

        // Redirect to main.html
        window.location.href = 'main.html';
    });

    function validateForm(firstName, lastName, email, password, confirmPassword) {
        if (firstName.trim() === '' || lastName.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
            alert('All fields are required');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return false;
        }

        // You can add more validation logic here, such as checking the email format

        return true;
    }

    // Check if the user has signed up previously
    const isSignedUp = localStorage.getItem('signedUp');
    if (isSignedUp) {
        // Clear the sign-up flag
        localStorage.removeItem('signedUp');
        // Redirect to main.html
        window.location.href = 'main.html';
    }
});
