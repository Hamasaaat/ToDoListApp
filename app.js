let todoTasksArray = [];
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("tasksList");
const tasksCount = document.getElementById("tasksCount");
const addTaskButton = document.querySelector(".add-btn");

document.addEventListener("DOMContentLoaded", function () {
  addTaskButton.addEventListener("click", addNewTask);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); 
      addNewTask();
    }
  });
  renderTasks();
});

function addNewTask() {
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    todoTasksArray.push({ text: newTask, disabled: false });
    taskInput.value = "";
    renderTasks();
  }
}

function deleteTask(index) {
  todoTasksArray.splice(index, 1); 
  renderTasks();
}

function toggleTask(index) {
  todoTasksArray[index].disabled = !todoTasksArray[index].disabled;
  renderTasks();
}


function renderTasks() {
  tasksList.innerHTML = ""; 

  todoTasksArray.forEach((item, index) => {
    const listItem = document.createElement("li");

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("todo-container");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = item.disabled; 

    const taskText = document.createElement("p");
    taskText.textContent = item.text;
    taskText.classList.toggle("disabled", item.disabled); 

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    //taskDiv
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(deleteBtn);

    // li
    listItem.appendChild(taskDiv);

    // ul
    tasksList.appendChild(listItem);

    checkbox.addEventListener("change", () => toggleTask(index)); 
    deleteBtn.addEventListener("click", () => deleteTask(index));

  });

  tasksCount.textContent = todoTasksArray.length;
}

