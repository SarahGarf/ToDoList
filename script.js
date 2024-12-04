function addTask() {
    const taskInput = document.getElementById('newTask');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Entrez une tache');
        return;
    }

    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');

    listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button>`;
    taskList.appendChild(listItem);

    taskInput.value = '';
}

function removeTask(button) {
    const listItem = button.parentElement;
    listItem.remove();
}