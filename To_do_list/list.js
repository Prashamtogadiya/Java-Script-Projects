let editId = -1;
let data = [];

function toggleTheme() {
    const body = document.body;
    const themeToggleBtn = document.getElementById('themeToggleBtn');

    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        themeToggleBtn.innerHTML = '🌛';
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        themeToggleBtn.innerHTML = '🌞';
    }
    display(); 
}

function add() {
    const tempObj = {
        task: document.getElementById('todo').value,
        newtask: document.getElementById('todo').value,
        complete: false
    };
    for (let i of data) {
        if (tempObj.task.toLowerCase() === i.newtask.toLowerCase()) {
            Swal.fire({
                icon: "error",
                title: "Same Task, Try Again!",
            });
            return false;
        }
    }
    if (editId >= 0) {
        data[editId] = tempObj;
        editId = -1;
        document.getElementById('submit').value = "Submit";
    } else {
        data.push(tempObj);
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Task Successfully Added",
            showConfirmButton: false,
            timer: 1500
        });
    }

    display();
    document.getElementById('todo').value = '';
    return false;
}

function display(filteredData = data) {
    const temp = document.getElementById("form");
    let tempString = "";
    
    if (filteredData.length > 0) {
        let tableClass = document.body.classList.contains('dark') ? 'table-dark' : 'table-light';
        tempString = `<table class="table ${tableClass} table-hover"><thead><tr><th scope="col">Your Task</th><th scope="col">Action</th><th scope="col">Complete</th></tr></thead><tbody>`;
        for (let i = 0; i < filteredData.length; i++) {
            tempString += "<tr>";
            tempString += '<td id="task' + i + '" style="';
            if (filteredData[i].complete) {
                tempString += 'text-decoration: line-through;';
            }
            tempString += '">' + filteredData[i].task + '</td>';
            tempString += '<td><button class="btn btn-sm btn-warning" onclick="edit(' + i + ')">Edit</button> ';
            tempString += '<button class="btn btn-sm btn-danger" onclick="deleteData(' + i + ')">Delete</button></td>';
            tempString += '<td><input id="comp' + i + '" class="form-check-input" type="checkbox" onclick="toggleLineThrough(' + i + ')" ' + (filteredData[i].complete ? 'checked' : '') + '></td>';
            tempString += "</tr>";
        }
        tempString += "</tbody></table>";
    } else {
        tempString = '<p>No tasks found.</p>'; // Updated this line to display "No tasks found."
    }
    
    temp.innerHTML = tempString;
    updateTaskSummary();
}


function edit(id) {
    editId = id;
    document.getElementById('todo').value = data[editId].task;
    document.getElementById('submit').value = "Edit";
}

function deleteData(id) {
    data.splice(id, 1);
    display();
}

function toggleLineThrough(index) {
    data[index].complete = !data[index].complete;

    const taskElement = document.getElementById('task' + index);
    if (data[index].complete) {
        taskElement.style.textDecoration = "line-through";
    } else {
        taskElement.style.textDecoration = "none";
    }

    display();
}

function updateTaskSummary() {
    const completedTasks = data.filter(task => task.complete).length;
    const pendingTasks = data.length - completedTasks;

    document.getElementById('completedTasks').innerText = `Completed Tasks: ${completedTasks}`;
    document.getElementById('pendingTasks').innerText = `Pending Tasks: ${pendingTasks}`;
}

function searchTasks() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const filteredData = data.filter(task => task.newtask.toLowerCase().includes(searchTerm));
    display(filteredData);
}
