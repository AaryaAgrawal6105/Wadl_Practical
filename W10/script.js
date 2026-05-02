let tasks = [];
let editIndex = -1;

function addTask() {
    let t = document.getElementById("task").value;
    if (!t) return;

    if (editIndex === -1) {
        tasks.push(t);
    } else {
        tasks[editIndex] = t;
        editIndex = -1;
        document.getElementById("btn").innerText = "Add Task";
    }
    
    document.getElementById("task").value = "";
    display();
}

function display() {
    let html = "";
    tasks.forEach((t, i) => {
        html += `<li>
            <span>${t}</span>
            <div class="actions">
                <button class="edit-btn" onclick="edit(${i})">Edit</button>
                <button class="del-btn" onclick="del(${i})">X</button>
            </div>
        </li>`;
    });
    document.getElementById("list").innerHTML = html;
}

function edit(i) {
    document.getElementById("task").value = tasks[i];
    editIndex = i;
    document.getElementById("btn").innerText = "Update Task";
}

function del(i) {
    tasks.splice(i, 1);
    display();
}