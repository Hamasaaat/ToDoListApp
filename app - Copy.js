let todoTasksArray = [];
const taskInput = document.getElementById("taskInput");
const tasksList = document.getElementById("tasksList");
const tasksCount = document.getElementById("tasksCount");
const addTaskButton = document.querySelector(".add-btn");
const storageKey = "toDoList";

document.addEventListener("DOMContentLoaded", function () {
  addTaskButton.addEventListener("click", addNewTask);
  taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addNewTask();
    }
  });
  todoTasksArray = retreiveFromStorage(storageKey);
  renderTasks(todoTasksArray);
});

function addNewTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const newTask = { text: taskText, disabled: false };
    const updatedTasksArray = [...todoTasksArray, newTask];
    saveToStorage(storageKey, updatedTasksArray);
    todoTasksArray = updatedTasksArray;
    taskInput.value = "";
    renderTasks(updatedTasksArray);
  }
}

function deleteTask(index, tasks) {
  const updatedTasks = [...tasks.filter((task, i) => i !== index)];
  saveToStorage(storageKey, updatedTasks);
  renderTasks(updatedTasks);
}

function toggleTask(index, tasks) {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, disabled: !task.disabled } : task
  );
  renderTasks(updatedTasks);
}

function renderTasks(tasks) {
  tasksList.innerHTML = "";

  if (tasks && tasks.length > 0) {
    tasks.forEach((task, index) => {
      const listItem = createTaskElement(task, index, tasks);
      tasksList.appendChild(listItem);
    });
  }

  tasksCount.textContent = tasks.length;
}

function createTaskElement(task, index, tasks) {
  const listItem = document.createElement("li");

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("todo-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-checkbox");
  checkbox.checked = task.disabled;

  const taskText = document.createElement("p");
  taskText.textContent = task.text;
  taskText.classList.toggle("disabled", task.disabled);

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

  checkbox.addEventListener("change", () => toggleTask(index, tasks));
  deleteBtn.addEventListener("click", () => deleteTask(index, tasks));

  return listItem;
}

function retreiveFromStorage(key) {
  try {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
  } catch (error) {
    console.error("Error retrieving data from localStorage:", error);
    return [];
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving data to localStorage:", error);
  }
}
