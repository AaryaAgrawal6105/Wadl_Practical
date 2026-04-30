let tasks = [];

function addTask() {
    let t = document.getElementById("task").value;
    tasks.push(t);
    display();
}

function display() {
    let html = "";
    tasks.forEach((t, i) => {
        html += `<li>${t} <button onclick="del(${i})">X</button></li>`;
    });
    document.getElementById("list").innerHTML = html;
}

function del(i) {
    tasks.splice(i, 1);
    display();
}