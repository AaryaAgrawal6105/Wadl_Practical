function register() {
    let user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    display();
}

function display() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let html = "";
    users.forEach(u => {
        html += `<li>${u.name} - ${u.email}</li>`;
    });
    document.getElementById("users").innerHTML = html;
}

display();