function showForm(type) {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const loginTab = document.getElementById("loginTab");
    const registerTab = document.getElementById("registerTab");

    if (type === 'login') {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        loginTab.classList.add("active");
        registerTab.classList.remove("active");
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        loginTab.classList.remove("active");
        registerTab.classList.add("active");
    }
}

async function handleRegister(event) {
    event.preventDefault();

    const dobValue = document.getElementById("regDob").value;
    const dobDate = new Date(dobValue);
    const today = new Date();

    if (dobDate > today) {
        alert("Date of Birth cannot be in the future!");
        return;
    }

    const userData = {
        name: document.getElementById("regName").value,
        email: document.getElementById("regEmail").value,
        mobile: document.getElementById("regMobile").value,
        dob: dobValue,
        city: document.getElementById("regCity").value,
        address: document.getElementById("regAddress").value,
    };

    try {
        // Simulating AJAX POST using Fetch API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log("Mock AJAX POST Success:", result);

            // Save to Local Storage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(userData);
            localStorage.setItem("users", JSON.stringify(users));

            alert("Registration Successful!");
            window.location.href = "users.html"; // Redirect to data list page
        }
    } catch (error) {
        console.error("AJAX Error:", error);
        alert("Failed to register. Check console.");
    }
}

function handleLogin(event) {
    event.preventDefault();
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    // Simple mock login check
    if (user && pass) {
        alert(`Welcome, ${user}!`);
        window.location.href = "users.html";
    }
}

function clearData() {
    if (confirm("Are you sure you want to clear all registered users?")) {
        localStorage.removeItem("users");
        location.reload();
    }
}

// Logic for users.html page
if (window.location.pathname.includes("users.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const tableBody = document.getElementById("userTableBody");
        
        if (tableBody) {
            tableBody.innerHTML = users.map(u => `
                <tr>
                    <td>${u.name}</td>
                    <td>${u.email}</td>
                    <td>${u.mobile}</td>
                    <td>${u.dob}</td>
                    <td>${u.city}</td>
                    <td>${u.address}</td>
                </tr>
            `).join("");
        }
    });
}