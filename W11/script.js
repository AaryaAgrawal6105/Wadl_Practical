// Switch between Login and Register forms
function showForm(type) {
    document.getElementById("loginForm").style.display = (type === 'login') ? 'block' : 'none';
    document.getElementById("registerForm").style.display = (type === 'register') ? 'block' : 'none';
    
    document.getElementById("loginTab").className = (type === 'login') ? 'active' : '';
    document.getElementById("registerTab").className = (type === 'register') ? 'active' : '';
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();

    // Get values from form
    let user = {
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        mobile: document.getElementById("regMobile").value,
        dob: document.getElementById("regDob").value,
        city: document.getElementById("regCity").value,
        address: document.getElementById("regAddress").value
    };

    // Save to Local Storage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered Successfully!");
    window.location.href = "users.html"; // Go to list page
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    alert("Login Successful!");
    window.location.href = "users.html";
}

// Clear all data
function clearData() {
    localStorage.removeItem("users");
    location.reload();
}

// Display users in the table (runs only on users.html)
if (window.location.pathname.includes("users.html")) {
    window.onload = function() {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let html = "";
        
        users.forEach(u => {
            html += `<tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.mobile}</td>
                <td>${u.dob}</td>
                <td>${u.city}</td>
                <td>${u.address}</td>
            </tr>`;
        });
        
        document.getElementById("userTableBody").innerHTML = html;
    };
}