// You can add JavaScript functionality here if needed
document.addEventListener("DOMContentLoaded", function() {
    // Function to handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Get form values
        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var message = document.getElementById("message").value;

        // Validate form fields (you can add more validation as needed)
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            alert("Please fill out all fields.");
            return;
        }

        // Display a thank you message
        alert("Thank you, " + name + "! Your message has been sent.");

        // Clear form fields
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("message").value = '';
    }

    // Add event listener to the form
    var form = document.getElementById("contact-form");
    form.addEventListener("submit", handleSubmit);
	
});
