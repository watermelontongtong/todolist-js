const addForm = document.querySelector("form");
const input = document.querySelector(".input-add");
const items = document.querySelector(".items");
const todaysDate = document.querySelector(".header__date");
const itemCount = document.querySelector(".header__task-count");
const todosList = document.querySelector(".items");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completedBtn = document.querySelector(".completed");

let todosArray = [];
let checkedArray = [];

function uploadStorage() {
  localStorage.setItem("todos", JSON.stringify(todosArray));
  localStorage.setItem("checked", JSON.stringify(checkedArray));
}

function onSubmitHandler(event) {
  event.preventDefault();
  const todoName = input.value;

  if (todoName === "") {
    return;
  }
  input.value = "";
  const todoObj = {
    name: todoName,
    id: Date.now(),
  };
  todosArray.push(todoObj);
  createHTML(todoObj);
  updateTaskCount();
  uploadStorage();
}

function createHTML(todoObj) {
  const li = document.createElement("li");
  li.setAttribute("class", "item");
  li.setAttribute("data-id", todoObj.id);
  li.innerHTML = `
    <div class="item__left">
      <input class="item__check" id="cb${todoObj.id}" type="checkbox" />
      <label for="cb${todoObj.id}"><i class="fas fa-check" data-id="${todoObj.id}"></i></label>  
      <span class="item__name">${todoObj.name}</span>
    </div>
    <button class="item__delete">
      <i class="far fa-times-circle" data-id="${todoObj.id}"></i>
    </button>
    `;
  items.appendChild(li);
}

function onTodosListHandler(event) {
  const itemType = event.target;
  if (itemType.className === "fas fa-check") {
    // check
    const id = itemType.dataset.id;
    if (checkedArray.indexOf(id) === -1) {
      checkedArray.push(id);
    } else {
      const index = checkedArray.indexOf(id);
      checkedArray.splice(index, 1);
    }

    uploadStorage();
  } else if (itemType.className === "far fa-times-circle") {
    // delete
    const id = itemType.dataset.id;
    const deleteTodo = document.querySelector(`.item[data-id='${id}']`);
    deleteTodo.remove();
    todosArray = todosArray.filter((todo) => todo.id !== +id);
    checkedArray = checkedArray.filter((todo) => +todo !== +id);
    updateTaskCount();
    uploadStorage();
  }
}

function updateTaskCount() {
  if (todosArray.length <= 1) {
    itemCount.innerText = `${todosArray.length} task`;
  } else {
    itemCount.innerText = `${todosArray.length} tasks`;
  }
}

function onAllBtnHandler() {
  allBtn.classList.add("select");
  activeBtn.classList.remove("select");
  completedBtn.classList.remove("select");
  todosArray.forEach((todo) => {
    const todoItem = document.querySelector(`.item[data-id='${todo.id}']`);
    todoItem.classList.remove("hidden");
  });
}

function onActiveBtnHandler() {
  allBtn.classList.remove("select");
  activeBtn.classList.add("select");
  completedBtn.classList.remove("select");
  todosArray.forEach((todo) => {
    const todoItem = document.querySelector(`.item[data-id='${todo.id}']`);
    todoItem.classList.remove("hidden");
  });
  checkedArray.forEach((completedId) => {
    const completedItem = document.querySelector(
      `.item[data-id='${completedId}']`
    );
    completedItem.classList.add("hidden");
  });
}

function onCompletedBtnHandler() {
  allBtn.classList.remove("select");
  activeBtn.classList.remove("select");
  completedBtn.classList.add("select");
  todosArray.forEach((todo) => {
    const todoItem = document.querySelector(`.item[data-id='${todo.id}']`);
    todoItem.classList.add("hidden");
  });
  checkedArray.forEach((completedId) => {
    const completedItem = document.querySelector(
      `.item[data-id='${completedId}']`
    );
    completedItem.classList.remove("hidden");
  });
}

addForm.addEventListener("submit", onSubmitHandler);
todosList.addEventListener("click", onTodosListHandler);
allBtn.addEventListener("click", onAllBtnHandler);
activeBtn.addEventListener("click", onActiveBtnHandler);
completedBtn.addEventListener("click", onCompletedBtnHandler);

const savedTodos = localStorage.getItem("todos");
const savedChecked = localStorage.getItem("checked");
if (savedTodos) {
  const parsedSavedTodos = JSON.parse(savedTodos);
  todosArray = parsedSavedTodos;
  parsedSavedTodos.forEach((todo) => createHTML(todo));
  updateTaskCount();
}

if (savedChecked) {
  const parsedSavedChecked = JSON.parse(savedChecked);
  checkedArray = parsedSavedChecked;
  parsedSavedChecked.forEach((checkedId) => {
    const checkTodo = document.querySelector(`#cb${checkedId}`);
    checkTodo.checked = true;
  });
}

function updateDate() {
  const today = new Date();
  const day = today.getDay();
  const month = today.getMonth();
  const date = today.getDate();
  const year = today.getFullYear();

  let dayInLetter;
  let monthInLetter;
  switch (day) {
    case 0:
      dayInLetter = "Sun";
      break;
    case 1:
      dayInLetter = "Mon";
      break;
    case 2:
      dayInLetter = "Tue";
      break;
    case 3:
      dayInLetter = "Wed";
      break;
    case 4:
      dayInLetter = "Thu";
      break;
    case 5:
      dayInLetter = "Fri";
      break;
    case 6:
      dayInLetter = "Sat";
      break;
  }

  switch (month) {
    case 0:
      monthInLetter = "Jan";
      break;
    case 1:
      monthInLetter = "Feb";
      break;
    case 2:
      monthInLetter = "Mar";
      break;
    case 3:
      monthInLetter = "Apr";
      break;
    case 4:
      monthInLetter = "May";
      break;
    case 5:
      monthInLetter = "June";
      break;
    case 6:
      monthInLetter = "July";
      break;
    case 7:
      monthInLetter = "Aug";
      break;
    case 8:
      monthInLetter = "Sep";
      break;
    case 9:
      monthInLetter = "Oct";
      break;
    case 10:
      monthInLetter = "Nov";
      break;
    case 11:
      monthInLetter = "Dec";
      break;
  }
  todaysDate.innerText = `${dayInLetter} ${monthInLetter} ${date} ${year}`;
}

updateDate();
setInterval(updateDate, 1000);
