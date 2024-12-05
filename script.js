document.addEventListener('DOMContentLoaded', (event) => {
    // Charger les tâches depuis localStorage lors du chargement de la page
    function loadTasks() {
        const taskList = document.getElementById('taskList');
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.forEach(taskText => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button>`;
            taskList.appendChild(listItem);
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
        const listItem = document.createElement('li');

        listItem.innerHTML = `${taskText} <button onclick="removeTask(this)">Delete</button>`;
        taskList.appendChild(listItem);

        // Sauvegarder la tâche dans localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
    }

    function removeTask(button) {
        const listItem = button.parentElement;
        const taskText = listItem.textContent.replace('Delete', '').trim();

        // Supprimer la tâche de localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));

        listItem.remove();
    }

    // Assurez-vous que les fonctions sont disponibles globalement
    window.addTask = addTask;
    window.removeTask = removeTask;

    // Charger les tâches au démarrage
    loadTasks();
});
    