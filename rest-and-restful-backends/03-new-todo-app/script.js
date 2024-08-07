let state = {
  currentFilter: "filterNone",
  todos: [],
};

let json = localStorage.getItem("listState");
if (json !== null) {
  state = JSON.parse(json);
}

async function getTodos() {
  const todosResponse = await fetch("http://localhost:4730/todos");
  const todos = await todosResponse.json();

  console.log(todos);

  state.todos = todos;
  renderTodos();
  saveState();
}

getTodos();

function saveState() {
  json = JSON.stringify(state);
  localStorage.setItem("listState", json);
}
const list = document.querySelector("#list");

function renderTodos() {
  let filteredTodos = state.todos;

  if (state.currentFilter === "filterDone") {
    filteredTodos = state.todos.filter((todo) => todo.done);
  } else if (state.currentFilter === "filterOpen") {
    filteredTodos = state.todos.filter((todo) => !todo.done);
  }

  list.innerHTML = "";
  filteredTodos.forEach((todo) => {
    const todoLi = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", (e) => {
      let newTodoState = e.target.checked;
      todo.done = newTodoState;
      putDoneToApi(todo);
      saveState();
      renderTodos();
    });

    todoLi.appendChild(checkbox);

    const todoText = document.createTextNode(todo.description);
    todoLi.append(todoText);

    list.appendChild(todoLi);
  });
}
renderTodos();

const addBtn = document.querySelector("#addButton");
const input = document.querySelector("#toDoInput");
const inputForm = document.querySelector("#inputForm");

inputForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  console.log(event);
  input.value = input.value.trimEnd();
  const isDuplicate = state.todos.some(
    (todo) => input.value.toLowerCase() === todo.description.toLowerCase()
  );

  if (isDuplicate) {
    input.value = "";
  }

  if (input.value !== "") {
    let todo = {
      description: input.value,
      done: false,
    };
    const newTodoWithId = await postToApi(todo);
    state.todos.push(newTodoWithId);
    input.value = "";
    renderTodos();
    saveState();
  }
});

const clearBtn = document.querySelector("#clearButton");
clearBtn.addEventListener("click", function () {
  clearApi();
  state.todos = [];
  renderTodos();
  saveState();
});

const removeDoneTaskBtn = document.querySelector("#removeDone");
removeDoneTaskBtn.addEventListener("click", function () {
  removeDoneFromApi();
  state.todos = state.todos.filter((todo) => !todo.done);
  renderTodos();
  saveState();
});

const filterNone = document.querySelector("#filterNone");
filterNone.addEventListener("change", (e) => {
  state.currentFilter = "filterNone";
  saveState();
  renderTodos();
});

const filterDone = document.querySelector("#filterDone");
filterDone.addEventListener("change", (e) => {
  state.currentFilter = "filterDone";
  saveState();
  renderTodos();
});

const filterOpen = document.querySelector("#filterOpen");
filterOpen.addEventListener("change", (e) => {
  state.currentFilter = "filterOpen";
  saveState();
  renderTodos();
});

if (state.currentFilter === "filterNone") {
  filterNone.checked = true;
} else if (state.currentFilter === "filterDone") {
  filterDone.checked = true;
} else if (state.currentFilter === "filterOpen") {
  filterOpen.checked = true;
}

async function postToApi(todo) {
  const response = await fetch("http://localhost:4730/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await response.json();
  console.log({ newTodo });
  return newTodo;
}

async function putDoneToApi(todo) {
  const response = await fetch("http://localhost:4730/todos/" + todo.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: todo.description,
      done: todo.done,
    }),
  });
}

async function clearApi() {
  state.todos.forEach(async function (todo) {
    const response = await fetch("http://localhost:4730/todos/" + todo.id, {
      method: "DELETE",
    });
    const deletedTodo = await response.json();
    console.log(deletedTodo);
  });
}

async function removeDoneFromApi() {
  state.todos.forEach(async function (todo) {
    if (todo.done) {
      const response = await fetch("http://localhost:4730/todos/" + todo.id, {
        method: "DELETE",
      });
      const deletedTodo = await response.json();
      console.log(deletedTodo);
    }
  });
}
