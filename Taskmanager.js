const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTasks();
}
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('data-index', index);
        li.appendChild(checkbox);
        
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add('completed');
        }
        li.appendChild(taskText);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.setAttribute('data-index', index);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    });
}
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
taskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});
taskList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        const index = event.target.getAttribute('data-index');
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    if (event.target.classList.contains('delete-btn')) {
        const index = event.target.getAttribute('data-index');
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
});
