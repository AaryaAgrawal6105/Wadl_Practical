function showForm(type) {
    document.getElementById("loginForm").style.display = type === "login" ? "block" : "none";
    document.getElementById("registerForm").style.display = type === "register" ? "block" : "none";
    document.getElementById("loginTab").classList.toggle("active", type === "login");
    document.getElementById("registerTab").classList.toggle("active", type === "register");
}

function val(id) {
    return document.getElementById(id).value;
}

function handleRegister(e) {
    e.preventDefault();

    const user = {
        name: val("regName"),
        email: val("regEmail"),
        mobile: val("regMobile"),
        dob: val("regDob"),
        city: val("regCity"),
        address: val("regAddress")
    };

    // AJAX POST
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/save");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user));

    // Save to localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered!");
    location.href = "users.html";
}

function handleLogin(e) {
    e.preventDefault();
    if (val("loginUser") && val("loginPass")) {
        alert("Welcome, " + val("loginUser"));
        location.href = "users.html";
    }
}

function clearData() {
    if (confirm("Clear all users?")) {
        localStorage.removeItem("users");
        location.reload();
    }
}

// Run only on users.html
if (location.pathname.includes("users.html")) {
    document.addEventListener("DOMContentLoaded", () => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        document.getElementById("userTableBody").innerHTML = users.map(u => `
            <tr>
                <td>${u.name}</td>
                <td>${u.email}</td>
                <td>${u.mobile}</td>
                <td>${u.dob}</td>
                <td>${u.city}</td>
                <td>${u.address}</td>
            </tr>
        `).join("");
    });
}
