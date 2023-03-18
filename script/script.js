// Elements Selection
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const todoEditBox = document.getElementById("edit-box");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditButton = document.querySelector("#cancel-edit-button");

let oldInputValue;

// Functions
function saveTodo(text) {
  const todo = document.createElement("div");
  todo.classList.add("todo");

  todo.innerHTML = `
    <button class="finish-todo">
      <i class="fa-solid fa-check"></i>
    </button>
    <h3> ${text} </h3>
    <button class="edit-todo">
      <i class="fa-solid fa-pen"></i>
    </button>
    <button class="remove-todo">
      <i class="fa-solid fa-xmark"></i>
    </button>
    `;

  todoList.appendChild(todo);

  todoInput.value = "";
  todoInput.focus();
}

const toggleForms = () => {
  if (todoEditBox.open) {
    todoEditBox.close();
  } else {
    todoEditBox.showModal();
  }
};

const updateTodo = (text) => {
  const todos = document.querySelectorAll(".todo");

  todos.forEach((todo) => {
    let todoTitle = todo.querySelector("h3");

    if (todoTitle.innerText === oldInputValue) {
      todoTitle.innerText = text;
    }
  });
};

// Events
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = todoInput.value;

  if (inputValue) {
    saveTodo(inputValue);
  }
});

document.addEventListener("click", (e) => {
  const targetElement = e.target;
  const parentElement = targetElement.closest("div");
  let todoTitle;

  if (parentElement && parentElement.querySelector("h3")) {
    todoTitle = parentElement.querySelector("h3").innerText;
  }

  if (targetElement.classList.contains("finish-todo")) {
    parentElement.classList.toggle("done");
  } else if (targetElement.classList.contains("remove-todo")) {
    parentElement.remove();
  } else if (targetElement.classList.contains("edit-todo")) {
    toggleForms();

    editInput.value = todoTitle;
    oldInputValue = todoTitle;
  }
});

cancelEditButton.addEventListener("click", (e) => {
  e.preventDefault();

  toggleForms();
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const editInputValue = editInput.value;

  if (editInputValue) {
    updateTodo(editInputValue);
  }

  toggleForms();
});
