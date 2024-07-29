let editId = -1;
        let data = [];

        function add() {
            const tempObj = {
                task: document.getElementById('todo').value,
                complete: false 
            };
            for(i of data){
                if(tempObj.task==i.task){
                  alert("Same Task")
                  return false;
                }
            }
            if (editId >= 0) {
                data[editId] = tempObj;
                editId = -1;
                document.getElementById('submit').value = "Submit";
            } else {
                data.push(tempObj);
            }

            display();
            document.getElementById('todo').value = ''; 
            return false;
        }

        function display() {
            const temp = document.getElementById("form");
            let tempString = "";
            if (data.length !== 0) {
                tempString = '<table class="table table-dark table-striped"><thead><tr><th scope="col">Your Task</th><th scope="col">Action</th><th scope="col">Complete</th></tr></thead><tbody>';
                for (let i = 0; i < data.length; i++) {
                    tempString += "<tr>";
                    tempString += '<td id="task' + i + '" style="';
                    if (data[i].complete) {
                        tempString += 'text-decoration: line-through;';
                    }
                    tempString += '">' + data[i].task + '</td>';
                    tempString += '<td><button class="btn btn-sm btn-warning" onclick="edit(' + i + ')">Edit</button> ';
                    tempString += '<button class="btn btn-sm btn-danger" onclick="deleteData(' + i + ')">Delete</button></td>';
                    tempString += '<td><input id="comp' + i + '" class="form-check-input" type="checkbox" onclick="toggleLineThrough(' + i + ')" ' + (data[i].complete ? 'checked' : '') + '></td>';
                    tempString += "</tr>";
                }
                tempString += "</tbody></table>";
            } else {
                tempString = '<p>No tasks added yet.</p>';
            }
            temp.innerHTML = tempString;
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