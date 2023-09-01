// index.js

// console.log("Script loaded.");

const openButton = document.getElementById('addButton');
const cardContainer = document.getElementById('taskCard');
const storedId = [];
let currentField = 'taskid';

openButton.addEventListener('click', () => {
    validatetaskid();
});


function validatetaskid() {
    const taskidInput = document.getElementById('taskid');
    const taskid = parseInt(taskidInput.value);

    if (isNaN(taskid) || storedId.includes(taskid)) {
        taskidInput.setCustomValidity('Please enter a valid and unique Parent Task ID.');
    } else {
        taskidInput.setCustomValidity('');
    }
}

function validateDateRange() {
    const endDateInput = document.getElementById('endDate');
    const startDateInput = document.getElementById('startDate');
    const endDate = new Date(endDateInput.value);
    const startDate = new Date(startDateInput.value);

    if (endDate <= startDate) {
        endDateInput.setCustomValidity('End Date must be later than Start Date.');
    } else {
        endDateInput.setCustomValidity('');
    }
}



modalForm.addEventListener('submit', function (event) {
    event.preventDefault();

    if (currentField === 'taskid') {
        validatetaskid();
    } else if (currentField === 'startDate' || currentField === 'endDate') {
        validateDateRange();
    }

    if (modalForm.checkValidity()) {
        const taskid = parseInt(document.getElementById('taskid').value);
        const parentTaskName = document.getElementById('parentTaskName').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        const parentTaskStatus = document.getElementById('parentTaskStatus').value;

        storedId.push(taskid);
        console.log(storedId)
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3><span>${taskid} </span><span>${parentTaskName} </span></h3>
            <p>Start Date: ${startDate}</p>
            <p>End Date: ${endDate}</p>
            <p>Status: ${parentTaskStatus}</p>
        `;

        cardContainer.appendChild(card);

        modalForm.reset();
        modal.style.display = 'none';
    } else {
        document.getElementById(currentField).focus();
    }
});
