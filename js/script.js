let users = []; // Initialize an empty array to store user data

// Function to fetch user data from JSON file
async function fetchUsers() {
    try {
        const response = await fetch('json/users.json');
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        users = await response.json();
    } catch (error) {
        console.error(error);
    }
}

// Call the fetchUsers function to load user data
fetchUsers();

function login() {
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    // Check if user credentials are valid
    const user = users.find(u => u.username === usernameInput && u.password === passwordInput);

    if (user) {
        // Display user information
        document.getElementById("user-username").textContent = user.username;
        document.getElementById("user-email").textContent = user.email;
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-phone").textContent = user.phoneNo;
        document.getElementById("user-cbalance").textContent = user.cardBalance;
        
        // Hide the login form and show the user info
        document.getElementById("login-form").style.display = "none";
        document.getElementById("user-info").style.display = "block";
        document.getElementById("card-info").style.display = "block";
    } else {
        alert("Invalid username or password. Please try again.");
    }
}


function logout() {
    // currentUser = null;
    // document.getElementById("user").textContent = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("user-info").style.display = "none";
    document.getElementById("card-info").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function register() {
    const regUsername = document.getElementById("reg-username").value;
    const regPassword = document.getElementById("reg-password").value;
    const regEmail = document.getElementById("reg-email").value;
    const regName = document.getElementById("reg-name").value;
    const regPhone = document.getElementById("reg-phone").value;

    // Check if the username is already taken
    const usernameTaken = users.some(u => u.username === regUsername);

    if (usernameTaken) {
        alert("Username is already taken. Please choose another one.");
        return;
    }

    // Create a new user object
    const newUser = {
        "username": regUsername,
        "password": regPassword,
        "email": regEmail,
        "name": regName,
        "phoneNo": regPhone,
        "cardBalance": "25000"
    };

    // Add the new user to the users array
    users.push(newUser);

    localStorage.setItem('users', JSON.stringify(users));

    // Save the updated user data to the JSON file (optional)

    // Clear the registration form fields
    document.getElementById("reg-username").value = "";
    document.getElementById("reg-password").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-name").value = "";
    document.getElementById("reg-phone").value = "";

    alert("Registration successful. You can now log in.");
}

function showLoginForm() {
    // Hide the registration form and show the login form
    document.getElementById("registration-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function showRegistrationForm() {
    // Hide the login form and show the registration form
    document.getElementById("login-form").style.display = "none";
    document.getElementById("registration-form").style.display = "block";
}

function addCredit() {
    const cardbalance = parseInt(document.getElementById("user-cbalance").textContent);
    const credit = parseInt(document.getElementById("card-credit").value);

    const newbalance = cardbalance + credit;
    document.getElementById("user-cbalance").textContent = newbalance;
    document.getElementById("card-credit").value = "";
}

function subCredit() {
    const cardbalance = parseInt(document.getElementById("user-cbalance").textContent);
    const credit = parseInt(document.getElementById("card-credit").value);

    const newbalance = cardbalance - credit;
    document.getElementById("user-cbalance").textContent = newbalance;
    document.getElementById("card-credit").value = "";
}
