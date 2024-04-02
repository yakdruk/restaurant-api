
    const registerUser = async (username, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            const { token } = await response.json();
            console.log(`User registered successfully: ${token}`);
            return token; // Assuming the server responds with a token upon successful registration
        } catch (error) {
            console.error(`Error registering user: ${error.message}`);
            throw error;
        }
    };

    const loginUser = async (username, password) => {
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Failed to log in");
            }

            const { token } = await response.json();
            console.log(`User logged in successfully: ${token}`);
            return token; // Assuming the server responds with a token upon successful login
        } catch (error) {
            console.error(`Error logging in: ${error.message}`);
            throw error;
        }
    };

    const displayErrorMessage = (message) => {
        const errorElement = document.getElementById("errorMessage");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add("show");
            setTimeout(() => {
                errorElement.classList.remove("show");
            }, 5000); // Hide error message after 5 seconds
        } else {
            console.error("Error: Unable to find errorMessage element in the DOM");
        }
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission
        const { username, password } = event.target.elements;

        try {
            const token = await loginUser(username.value, password.value);
            localStorage.setItem("token", token); // Store token in local storage
            // After successful login, close the modal
            const loginModal = new bootstrap.Modal(
                document.getElementById("loginModal")
            );
            loginModal.hide();
        } catch (error) {
            // Handle login error by displaying error message to the user
            displayErrorMessage(
                "Failed to log in. Please check your credentials and try again."
            );
            console.error(`Error logging in: ${error.message}`);
        }
    };

    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission
        const { username, password, verifyPassword } = event.target.elements;

        if (password.value !== verifyPassword.value) {
            displayErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const token = await registerUser(username.value, password.value);
            localStorage.setItem("token", token); // Store token in local storage
            // After successful registration, close the modal
            const loginModal = new bootstrap.Modal(
                document.getElementById("loginModal")
            );
            loginModal.hide();
        } catch (error) {
            // Handle registration error by displaying error message to the user
            displayErrorMessage("Failed to register user. Please try again later.");
            console.error(`Error registering user: ${error.message}`);
        }
    };

    const isLoggedIn = () => localStorage.getItem("token") !== null;

    const toggleRegisterForm = () => {
        const loginForm = document.getElementById("loginForm");
        const registerForm = document.getElementById("registerForm");
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    };

    window.onload = () => {
        // Check if user is not logged in
        if (!isLoggedIn()) {
            // Show login/register modal
            const loginModal = new bootstrap.Modal(
                document.getElementById("loginModal")
            );
            loginModal.show();
        }

        const toggleRegisterBtn = document.getElementById("toggleRegisterBtn");
        toggleRegisterBtn.addEventListener("click", toggleRegisterForm);

        const loginForm = document.getElementById("loginForm");
        loginForm.addEventListener("submit", handleLoginFormSubmit);

        const registerForm = document.getElementById("registerForm");
        registerForm.addEventListener("submit", handleRegisterFormSubmit);
    };

    document.addEventListener("DOMContentLoaded", () => {
        // Add your code here that needs to be executed after the DOM is loaded
    });
