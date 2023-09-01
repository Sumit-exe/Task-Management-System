let tasks = [];

function generateID() {
    return Math.floor(Math.random() * 1000);
}

function addTask() {

    const taskName = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const status = document.getElementById('status').value;

    const taskID = generateID();
    tasks.push({
        id: taskID,
        name: taskName,
        startDate: startDate,
        endDate: endDate,
        status: status,
        subtasks: []
    });
    displayTasks();
    clearForm();
}

function updateTaskInArray(taskID, taskName, startDate, endDate, status, subTaskId = NaN) {
    const taskIndex = tasks.findIndex(task => task.id === taskID);
    if (taskIndex === -1) return;
    if(!Number.isNaN(subTaskId)){
        const idx = tasks[taskIndex].subtasks.findIndex(task => task.id === subTaskId);
        const newSubtask = {
            id: subTaskId,
            name: taskName,
            startDate: startDate,
            endDate: endDate,
            status: status
        }
        tasks[taskIndex].subtasks.splice(idx, 1, newSubtask);
    } else {
        // update task
        tasks[taskIndex].name = taskName;
        tasks[taskIndex].startDate = startDate;
        tasks[taskIndex].endDate = endDate;
        tasks[taskIndex].status = status;
    }
}

function updateTask() {
    const taskName = document.getElementById('taskName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const status = document.getElementById('status').value;

    if (taskName && startDate && endDate) {
        const taskID = parseInt(document.getElementById('taskId').value);
        const subTaskID = parseInt(document.getElementById('subTaskId').value);
        console.log(taskID, subTaskID);
        updateTaskInArray(taskID, taskName, startDate, endDate, status, subTaskID);
        displayTasks();
        clearForm();
    } else {
        alert('Please fill in all required fields.');
    }
}

function deleteTask(taskID, subTaskId = null) {
    const taskIndex = tasks.findIndex(task => task.id === taskID);
    if(subTaskId){
        const subTaskIndex = tasks[taskIndex].subtasks.findIndex(task => task.id === subTaskId)
        if (subTaskIndex !== -1) {
            tasks[taskIndex].subtasks.splice(subTaskIndex, 1);
        }
    } else if(taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
    displayTasks();
}

function addSubtask(taskID) {
    const parentTask = tasks.find(task => task.id === taskID);
    if (parentTask) {
        const subtaskParentId = taskID;
        const subtaskName = document.getElementById(`subtaskName-${subtaskParentId}`).value;
        const subtaskStartDate = document.getElementById(`subtaskStartDate-${subtaskParentId}`).value;
        const subtaskEndDate = document.getElementById(`subtaskEndDate-${subtaskParentId}`).value;
        const subtaskStatus = document.getElementById(`subtaskStatus-${subtaskParentId}`).value;

        if (subtaskName && subtaskStartDate && subtaskEndDate) {
            parentTask.subtasks.push({
                id: generateID(),
                name: subtaskName,
                startDate: subtaskStartDate,
                endDate: subtaskEndDate,
                status: subtaskStatus
            });
            displayTasks();
            clearSubtaskForm(subtaskParentId);
        } else {
            alert('Please fill in all required fields for the subtask.');
        }
    }
}

function displayTasks() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    tasks.forEach(task => {
        const li = createTaskListItem(task);
        if (task.subtasks.length > 0) {
            const subtaskList = document.createElement('ul');
            subtaskList.className = 'subtask-list';
            task.subtasks.forEach(subtask => {
                const subtaskLi = document.createElement('li');
                subtaskLi.innerHTML = `
                    ${subtask.name} <br/> 
                    (${subtask.startDate} to ${subtask.endDate}) - ${subtask.status}
                    <br/>
                    <div>
                        <button class="edit-button" onclick="editTask(${task.id}, ${subtask.id})">Edit</button>
                        <button class="delete-button" onclick="deleteTask(${task.id}, ${subtask.id})">Delete</button>
                    </div>
                `;
                subtaskList.appendChild(subtaskLi);
            });
            li.appendChild(subtaskList);
        }
        taskListElement.appendChild(li);
    });
}

function createTaskListItem(task) {
    const li = document.createElement('li');
    // <label for="taskName">Task Name:</label>
    // <input type="text" id="taskName" placeholder="enter task Name" required><br>

    // <label for="startDate">Start Date:</label>
    // <input type="date" id="startDate" required><br>

    // <label for="endDate">End Date:</label>
    // <input type="date" id="endDate" required><br>
    li.innerHTML = `
    <div>
    <div id="displayedData">
        ${task.name}
    </div>
    <div id="displayedData">
        ${task.startDate}
    </div>
    <div id="displayedData">
        ${task.endDate}
    </div> 
    <div>
        ${task.status}
    </div>



    </div>

        <div class="taskLiButtons">
            <button class="edit-button" onclick="editTask(${task.id})">Edit</button>
            <button class="delete-button" onclick="deleteTask(${task.id})">Delete</button>
            <button class="add-subtask-button" onclick="showSubtaskForm(${task.id})">Add Subtask</button>
        </div>

        <div id="subtaskForm-${task.id}" style="display: none;">
            ${createSubtaskForm(task.id)}
        </div>
    `;


    return li;
}






function createSubtaskForm(taskID) {
    return `
        <form >
            <input type="hidden" id="subtaskParentId" value="${taskID}">
            <label for="subtaskName-${taskID}">Subtask Name:</label>
            <input type="text" id="subtaskName-${taskID}" required><br>
            
            <label for="subtaskStartDate-${taskID}">Start Date:</label>
            <input type="date" id="subtaskStartDate-${taskID}" required><br>
            
            <label for="subtaskEndDate-${taskID}">End Date:</label>
            <input type="date" id="subtaskEndDate-${taskID}" required><br>
            
            <label for="subtaskStatus-${taskID}">Status:</label>
            <select id="subtaskStatus-${taskID}" required>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
                <option value="DuePassed">DuePassed</option>
                <option value="Canceled">Canceled</option>
            </select><br>
            
            <button type="button" onclick="addSubtask(${taskID})">Add Subtask</button>
           
            
        </form>
    `;
}
function showSubtaskForm(taskID) {
    const subtaskForm = document.getElementById(`subtaskForm-${taskID}`);
    subtaskForm.style.display = 'block';
}

function showUpdateSubtasksForm(taskID) {
    const updateSubtasksForm = document.getElementById(`updateSubtasksForm-${taskID}`);
    updateSubtasksForm.style.display = 'block';
}

function createUpdateSubtasksForm(task) {
    const subtasksList = task.subtasks.map((subtask, index) => `
        <label for="updateSubtaskName-${task.id}-${index}">Subtask Name:</label>
        <input type="text" id="updateSubtaskName-${task.id}-${index}" value="${subtask.name}" required><br>
        
        <label for="updateSubtaskStartDate-${task.id}-${index}">Start Date:</label>
        <input type="date" id="updateSubtaskStartDate-${task.id}-${index}" value="${subtask.startDate}" required><br>
        
        <label for="updateSubtaskEndDate-${task.id}-${index}">End Date:</label>
        <input type="date" id="updateSubtaskEndDate-${task.id}-${index}" value="${subtask.endDate}" required><br>
        
        <label for="updateSubtaskStatus-${task.id}-${index}">Status:</label>
        <select id="updateSubtaskStatus-${task.id}-${index}" required>
            <option value="In-Progress" ${subtask.status === 'In-Progress' ? 'selected' : ''}>In-Progress</option>
            <option value="Completed" ${subtask.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="DuePassed" ${subtask.status === 'DuePassed' ? 'selected' : ''}>DuePassed</option>
            <option value="Canceled" ${subtask.status === 'Canceled' ? 'selected' : ''}>Canceled</option>
        </select>
        <br>
    `).join('<br>');

    return `
        <form>
            ${subtasksList}
            <button type="button" onclick="updateSubtasks(${task.id})">Update Subtasks</button>
        </form>
    `;
}



function updateSubtasks(taskID) {
    const parentTask = tasks.find(task => task.id === taskID);
    if (parentTask) {
        parentTask.subtasks.forEach((subtask, index) => {
            const updatedSubtaskName = document.getElementById(`updateSubtaskName-${taskID}-${index}`).value;
            const updatedSubtaskStartDate = document.getElementById(`updateSubtaskStartDate-${taskID}-${index}`).value;
            const updatedSubtaskEndDate = document.getElementById(`updateSubtaskEndDate-${taskID}-${index}`).value;
            const updatedSubtaskStatus = document.getElementById(`updateSubtaskStatus-${taskID}-${index}`).value;

            subtask.name = updatedSubtaskName;
            subtask.startDate = updatedSubtaskStartDate;
            subtask.endDate = updatedSubtaskEndDate;
            subtask.status = updatedSubtaskStatus;
        });
        displayTasks();
    }
}

function editTask(taskID, subTaskId = null) {
    let taskIdx = tasks.findIndex(task => task.id === taskID);
    let task = tasks[taskIdx];
    if(subTaskId){
        task = tasks[taskIdx].subtasks.find(task => task.id === subTaskId);
    }

    if (task) {
        document.getElementById('taskId').value = tasks[taskIdx].id;
        document.getElementById('subTaskId').value = subTaskId;
        document.getElementById('taskName').value = task.name;
        document.getElementById('startDate').value = task.startDate;
        document.getElementById('endDate').value = task.endDate;
        document.getElementById('status').value = task.status;
        document.getElementById('addButton').style.display = 'none';
        document.getElementById('updateButton').style.display = 'inline-block';
    }
    console.log('editing - ', taskID, subTaskId);
}

function clearForm() {
    document.getElementById('taskId').value = '';
    document.getElementById('subTaskId').value = '';
    document.getElementById('taskName').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('status').value = 'In-Progress';
    document.getElementById('addButton').style.display = 'inline-block';
    document.getElementById('updateButton').style.display = 'none';
}

function clearSubtaskForm(taskID) {
    const subtaskForm = document.getElementById(`subtaskForm-${taskID}`);
    subtaskForm.style.display = 'none';
    const subtaskInputs = subtaskForm.querySelectorAll('input');
    subtaskInputs.forEach(input => (input.value = ''));
}

displayTasks();
