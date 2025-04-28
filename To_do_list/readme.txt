🚀 **Excited to Present My Latest Project!** 🚀

I’m thrilled to share a to-do list application I’ve built using HTML, CSS, Bootstrap, and JavaScript. This project is packed with features that enhance task management and user experience:

- **Task Management**: Effortlessly add, edit, and delete tasks.
- **Search Functionality**: Quickly find tasks with a dynamic search feature.
- **Theme Toggle**: Seamlessly switch between dark and light modes for better accessibility.
- **Completion Tracking**: Monitor progress with real-time task completion updates.
- **Duplicate Prevention**: Ensures each task is unique.

This project highlights my front-end development skills and dedication to crafting user-friendly applications. I’m excited to hear your feedback!
<div class="col-12 col-lg-10 col-md-8 col-sm-10 mb-3">
                    <label class="form-label">Enter Task</label>
                    <input type="text" class="form-control" id="toDo" placeholder="Enter Your Task" required>
                </div>
                <div class="col-12 col-lg-10 col-md-8 col-sm-10 mb-3">
                    <label class="form-label">Select Date</label>
                    <input type="date" class="form-control" id="taskDate">
                </div>
                <div class="col-12 col-lg-10 col-md-8 col-sm-10 mb-3">
                    <label class="form-label">Select Priority</label>
                    <select class="form-select" id="taskPriority">
                        <option value="1" data-icon="fa-flag" class="text-danger">Priority-1 (High)</option>
                        <option value="2" data-icon="fa-flag" class="text-warning">Priority-2 (Medium)</option>
                        <option value="3" data-icon="fa-flag" class="text-primary">Priority-3 (Low)</option>
                        <option value="4" data-icon="fa-flag" class="text-secondary">Priority-4 (Very Low)</option>
                    </select>
                </div>

                <div class="col-12 col-lg-10 col-md-8 col-sm-10 mb-3">
                    <input type="submit" class="btn btn-submit" id="submit" value="Submit" onclick="return add()">
                </div>
                <div class="col-12 col-lg-10 col-md-8 col-sm-10 mb-3">
                    <label class="form-label">Search Task</label>
                    <input type="text" class="form-control" id="search" placeholder="Search Your Task"
                        oninput="searchTasks()">
                </div>