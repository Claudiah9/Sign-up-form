document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signupForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent form from submitting

        let isValid = true;

        // Get form elements
        const firstName = form.elements["first name"];
        const lastName = form.elements["Last name"];
        const emailPhone = form.elements["Email or phone number"];
        const dob = form.elements[3]; // Date of birth field
        const password = form.elements["Password"];
        const confirmPassword = form.elements["Confirm password"];
        const termsCheckbox = document.getElementById("terms");

        // Clear previous error messages
        document.querySelectorAll(".error").forEach(el => el.remove());

        // Helper function to show errors
        function showError(input, message) {
            const error = document.createElement("p");
            error.className = "error";
            error.style.color = "red";
            error.style.fontSize = "12px";
            error.textContent = message;
            input.parentNode.appendChild(error);
            isValid = false;
        }

        // Validate first name and last name
        if (!firstName.value.trim()) showError(firstName, "First name is required.");
        if (!lastName.value.trim()) showError(lastName, "Last name is required.");

        // Validate email or phone
        if (!emailPhone.value.trim()) {
            showError(emailPhone, "Email or phone number is required.");
        } else if (!/^\S+@\S+\.\S+$/.test(emailPhone.value) && !/^\d{10,}$/.test(emailPhone.value)) {
            showError(emailPhone, "Enter a valid email or phone number.");
        }

        // Validate date of birth
        if (!dob.value) showError(dob, "Date of birth is required.");

        // Validate password
        if (!password.value) {
            showError(password, "Password is required.");
        } else if (password.value.length < 6) {
            showError(password, "Password must be at least 6 characters.");
        }

        // Validate confirm password
        if (!confirmPassword.value) {
            showError(confirmPassword, "Please confirm your password.");
        } else if (password.value !== confirmPassword.value) {
            showError(confirmPassword, "Passwords do not match.");
        }

        // Validate terms checkbox
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, "You must agree to the Terms and Privacy Policy.");
        }

        // If all fields are valid, submit form
        if (isValid) {
            alert("Account created successfully!");

            // Save user details in localStorage if "Remember me" is checked
            const rememberMe = document.getElementById("remember").checked;
            if (rememberMe) {
                localStorage.setItem("userFirstName", firstName.value);
                localStorage.setItem("userLastName", lastName.value);
                localStorage.setItem("userEmailPhone", emailPhone.value);
            }

            // Simulate successful submission (reset form)
            form.reset();
        }
    });

    // Prefill form if "Remember me" was checked before
    if (localStorage.getItem("userFirstName")) {
        form.elements["first name"].value = localStorage.getItem("userFirstName");
        form.elements["Last name"].value = localStorage.getItem("userLastName");
        form.elements["Email or phone number"].value = localStorage.getItem("userEmailPhone");
        document.getElementById("remember").checked = true;
    }
});
