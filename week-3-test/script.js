
const taskForm = document.getElementById("taskForm");
const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const taskList = document.getElementById("taskList");
const filterInput = document.getElementById("filterInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks(taskArray) {

  taskList.innerHTML = "";

  taskArray.map((task) => {

    const div = document.createElement("div");
    div.classList.add("task");

    div.innerHTML = `
      <h3>${task.name}</h3>
      <p>${task.description}</p>
      <button class="deleteBtn" onclick="deleteTask(${task.id})">
        Delete
      </button>
    `;

    taskList.appendChild(div);
  });
}


taskForm.onsubmit = function (e) {

  e.preventDefault();

  const newTask = {
    id: Date.now(),
    name: taskName.value,
    description: taskDesc.value
  };

  tasks.push(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks(tasks);

  taskForm.reset();
};


filterInput.addEventListener("keyup", () => {

  const search = filterInput.value.toLowerCase();

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(search)
  );

  displayTasks(filteredTasks);
});


displayTasks(tasks);



