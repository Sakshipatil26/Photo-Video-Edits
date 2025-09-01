document.addEventListener("DOMContentLoaded", function() {
    const profileImageInput = document.getElementById("profileImage");
    const profilePic = document.getElementById("profilePic");
    const logoutButton = document.getElementById("logoutButton");

    profileImageInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    logoutButton.addEventListener("click", function() {
        // Perform logout action here, such as redirecting to the logout endpoint
        window.location.href = "/logout";
    });
});
