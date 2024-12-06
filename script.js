document.addEventListener('DOMContentLoaded', (event) => {
    // Charger les tâches depuis localStorage lors du chargement de la page
    function loadTasks() {
        const taskList = document.getElementById('taskList');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach((task, index) => {
            addTaskToList(taskList, task.text, task.completed);
        });
    }

    function addTask() {
        const taskInput = document.getElementById('newTask');
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task');
            return;
        }

        const taskList = document.getElementById('taskList');
        addTaskToList(taskList, taskText, false);

        // Sauvegarder la tâche dans localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
    }

    function addTaskToList(list, taskText, isCompleted) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" id="checkbox-${taskText}" ${isCompleted ? 'checked' : ''} onchange="toggleTask(this)">
            <label for="checkbox-${taskText}">${taskText}</label>
            <button onclick="removeTask(this)">Delete</button>
        `;
        list.appendChild(listItem);
    }

    function removeTask(button) {
        const listItem = button.parentElement;
        const taskText = listItem.textContent.replace('Delete', '').replace(/\s+/g, ' ').trim();

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        listItem.remove();
    }

    function toggleTask(checkbox) {
        const listItem = checkbox.parentElement;
        const taskText = listItem.textContent.replace('Delete', '').replace(/\s+/g, ' ').trim();
        const isCompleted = checkbox.checked;

        // Mettre à jour localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(task =>
            task.text === taskText ? { ...task, completed: isCompleted } : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }


    window.addTask = addTask;
    window.removeTask = removeTask;
    window.toggleTask = toggleTask;
    loadTasks();
});

