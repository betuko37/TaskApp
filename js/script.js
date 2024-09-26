// Se crea el evento submit vinculado al formulario para ejecutar saveTask
document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
    // Obtener datos de la vista
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    // Creamos un objeto con los datos
    const task = {
        title,
        description,
    }

    // Validar que el item 'tasks' no exista en localStorage
    if (localStorage.getItem('tasks') == null) {
        // Si no existe, vamos a crearlo
        let tasks = [];
        tasks.push(task);
        // Aquí insertamos nuestro objeto en localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        // Obtengo el item existente
        let storedTasks = JSON.parse(localStorage.getItem('tasks'));
        // Lo actualizo
        storedTasks.push(task);
        // Lo regreso actualizado
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    getTask();

    document.getElementById("formTask").reset();
    e.preventDefault();
}

function getTask() {
    // Obtenemos los items del localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    // Obtenemos nuestro elemento div del HTML
    let taskview = document.getElementById('tasks');

    // Limpiamos
    taskview.innerHTML = '';

    // Iteramos sobre el arreglo para obtener cada elemento en él y mostrarlo en la vista
    for (let i = 0; i < tasks.length; i++) {  
        let title = tasks[i].title;
        let description = tasks[i].description;

        taskview.innerHTML += `
            <div class="card mb-4">
                <div class="card-body">
                    <p>${title} - ${description}</p>
                    <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
                </div>
            </div>
        `;
    }
}

function deleteTask(title) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (let i = 0; i < tasks.length; i++) {  
        if (tasks[i].title == title) {
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();
}

getTask();
