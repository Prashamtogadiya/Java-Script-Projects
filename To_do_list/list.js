let editId = -1;
let data = [];

// Function to toggle theme between light and dark
function toggleTheme() {
  const body = document.body;
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
  display();
}
// Function to handle adding and editing tasks
function add() {
    const taskInput = document.getElementById("toDo").value.trim();
    const dateInput = document.getElementById("taskDate").value.trim();
    const priorityInput = document.getElementById("taskPriority").value;

    if (taskInput === "") {
        Swal.fire({
            icon: "error",
            title: "Task cannot be empty!",
            text: "Please enter a task description.",
        });
        return false;
    }

    if (dateInput === "") {
        Swal.fire({
            icon: "error",
            title: "Date cannot be empty!",
            text: "Please select a date for the task.",
        });
        return false;
    }

    const tempObj = {
        task: taskInput,
        newtask: taskInput,
        date: dateInput,
        priority: priorityInput, // Save the priority
        complete: false,
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
        document.getElementById("submit").value = "Submit";
    } else {
        data.push(tempObj);
        Swal.fire({
            position: "middle",
            icon: "success",
            title: "Task Successfully Added",
            showConfirmButton: false,
            timer: 1500,
        });
    }

    display();
    document.getElementById("toDo").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskPriority").value = "1"; // Reset priority to default
    resetSearch();
  
    return false; // Ensure the form doesn't refresh the page
}
function resetSearch() {
    document.getElementById("search").value = "";
    display(data);
  }


function display(filteredData = data) {
    const temp = document.getElementById("form");
    const taskBox = document.getElementById("taskBox");
    let tempString = "";

    // Get the selected sorting criterion
    const sortCriteria = document.getElementById("sortCriteria").value;

    // Sort the tasks based on the selected criterion
    filteredData.sort((a, b) => {
        if (sortCriteria === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortCriteria === "priority") {
            return a.priority - b.priority;
        }
    });

    // Class mapping for priority flag colors and checkbox colors
    const priorityIcons = {
        1: "fa-solid fa-flag text-danger", // Red flag for Priority-1
        2: "fa-solid fa-flag text-warning", // Orange flag for Priority-2
        3: "fa-solid fa-flag text-primary", // Blue flag for Priority-3
        4: "fa-solid fa-flag text-secondary" // Plain flag for Priority-4
    };

    const priorityColors = {
        1: "background-color: red;",    // Red for Priority-1
        2: "background-color: orange;", // Orange for Priority-2
        3: "background-color: blue;",   // Blue for Priority-3
        4: "background-color: gray;"    // Gray for Priority-4
    };

    if (filteredData.length > 0) {
        let tableClass = document.body.classList.contains("dark")
            ? "table-dark"
            : "table-light";
        tempString = `<table class="table ${tableClass} table-hover"><thead><tr><th scope="col">Priority</th><th scope="col">Your Task</th><th scope="col">Date</th><th scope="col">Action</th><th scope="col">Complete</th></tr></thead><tbody>`;
        for (let i = 0; i < filteredData.length; i++) {
            let originalIndex = data.indexOf(filteredData[i]);
            tempString += "<tr>";
            tempString += "<td><i class='" + priorityIcons[filteredData[i].priority] + "'></i> Priority-" + filteredData[i].priority + "</td>"; // Add flag icon
            tempString += '<td id="task' + originalIndex + '" style="';
            if (filteredData[i].complete) {
                tempString += "text-decoration: line-through;";
            }
            tempString += '">' + filteredData[i].task + "</td>";
            tempString += "<td>" + filteredData[i].date + "</td>";
            tempString +=
                '<td><button class="btn btn-sm btn-warning" onclick="edit(' +
                originalIndex +
                ')">Edit</button> ';
            tempString +=
                '<button class="btn btn-sm btn-danger" onclick="deleteData(' +
                originalIndex +
                ')">Delete</button></td>';
            tempString +=
                '<td><input id="comp' +
                originalIndex +
                '" class="form-check-input" type="checkbox" style="' + priorityColors[filteredData[i].priority] + '" onclick="toggleLineThrough(' +
                originalIndex +
                ')" ' +
                (filteredData[i].complete ? "checked" : "") +
                "></td>";
            tempString += "</tr>";
        }
        tempString += "</tbody></table>";
        taskBox.style.display = "block";
    } else {
        tempString = "<p>No tasks found.</p>";
        taskBox.style.display = "none";
    }

    temp.innerHTML = tempString;
    updateTaskSummary();
}



// Function to handle task editing
function edit(id) {
  editId = id;
  document.getElementById("toDo").value = data[editId].task;
  document.getElementById("taskDate").value = data[editId].date;
  document.getElementById("submit").value = "Edit";
  resetSearch();

}

// Function to handle task deletion
function deleteData(id) {
  data.splice(id, 1);
  display();
  resetSearch();

}

// Function to toggle line-through style for tasks
// Function to toggle line-through style for tasks
function toggleLineThrough(index) {
  data[index].complete = !data[index].complete;

  const taskElement = document.getElementById("task" + index);
  if (data[index].complete) {
    taskElement.style.textDecoration = "line-through";

    // Trigger confetti effect from the left side of the screen

    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.6 },
      zIndex: 999,
    });

    // Trigger confetti effect from the right side of the screen
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.6 },
      zIndex: 999,
    });
  } else {
    taskElement.style.textDecoration = "none";
  }

  display();
  resetSearch();

}

// Function to update task summary
function updateTaskSummary() {
  const completedTasks = data.filter((task) => task.complete).length;
  const pendingTasks = data.length - completedTasks;

  document.getElementById(
    "completedTasks"
  ).innerText = `Completed Tasks: ${completedTasks}`;
  document.getElementById(
    "pendingTasks"
  ).innerText = `Pending Tasks: ${pendingTasks}`;
}

// Function to search tasks
function searchTasks() {
  const searchTerm = document.getElementById("search").value.toLowerCase();
  const filteredData = data.filter((task) =>
    task.newtask.toLowerCase().includes(searchTerm)
  );
  display(filteredData);
}

// Attach the add function to the form's submit event
document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    add();
  });
