"use strict";

import Today from "./updateDate.js";

const addForm = document.querySelector("form");
const input = document.querySelector(".input-add");
const items = document.querySelector(".items");
const itemCount = document.querySelector(".header__task-count");
const todosList = document.querySelector(".items");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completedBtn = document.querySelector(".completed");
const buttons = document.querySelector(".header__task-state");

const CLASS_SELECT = "select";
const CLASS_HIDDEN = "hidden";

let todosArray = [];
let checkedArray = [];

buttons.addEventListener("click", (event) => {
  const buttonClassName = event.target.className;
  if (buttonClassName === "active") {
    selectClassHandler(activeBtn, allBtn, completedBtn);
    hiddenClassHandler(todosArray, "remove");
    hiddenClassHandler(checkedArray, "add");
  } else if (buttonClassName === "completed") {
    selectClassHandler(completedBtn, activeBtn, allBtn);
    hiddenClassHandler(todosArray, "add");
    hiddenClassHandler(checkedArray, "remove");
  } else if (buttonClassName === "all") {
    selectClassHandler(allBtn, activeBtn, completedBtn);
    hiddenClassHandler(todosArray, "remove");
  }
});

function selectClassHandler(addBtn, removeBtn1, removeBtn2) {
  addBtn.classList.add(CLASS_SELECT);
  removeBtn1.classList.remove(CLASS_SELECT);
  removeBtn2.classList.remove(CLASS_SELECT);
}

function hiddenClassHandler(array, action) {
  array.forEach((todo) => {
    const todoList = document.querySelector(`.item[data-id='${todo.id}']`);
    if (action === "remove") {
      todoList.classList.remove(CLASS_HIDDEN);
    } else if (action === "add") {
      todoList.classList.add(CLASS_HIDDEN);
    }
  });
}

const date = new Today();
date.update();
setInterval(date.update, 1000);

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
      <span class="item__name" data-id="${todoObj.id}">${todoObj.name}</span>
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
    const itemName = document.querySelector(
      `.item__name[data-id='${id}']`
    ).innerText;
    const itemObj = {
      name: itemName,
      id: id,
    };
    if (
      checkedArray.some(
        (item) => JSON.stringify(item) === JSON.stringify(itemObj)
      )
    ) {
      const index = checkedArray.findIndex((item) => item.id === id);
      checkedArray.splice(index, 1);
    } else {
      checkedArray.push(itemObj);
    }

    uploadStorage();
  } else if (itemType.className === "far fa-times-circle") {
    // delete
    const id = itemType.dataset.id;
    const deleteTodo = document.querySelector(`.item[data-id='${id}']`);
    deleteTodo.remove();
    todosArray = todosArray.filter((todo) => todo.id !== +id);
    checkedArray = checkedArray.filter((todo) => +todo.id !== +id);
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

addForm.addEventListener("submit", onSubmitHandler);
todosList.addEventListener("click", onTodosListHandler);

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
  parsedSavedChecked.forEach((checkedTodo) => {
    const checkTodo = document.querySelector(`#cb${checkedTodo.id}`);
    checkTodo.checked = true;
  });
}
