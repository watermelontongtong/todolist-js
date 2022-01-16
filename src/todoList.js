"use strict";

export default class ToDoList {
  constructor() {
    this.addForm = document.querySelector("form");
    this.input = document.querySelector(".input-add");
    this.items = document.querySelector(".items");
    this.itemCount = document.querySelector(".header__task-count");
    this.todosList = document.querySelector(".items");
    this.savedTodos = localStorage.getItem("todos");
    this.savedChecked = localStorage.getItem("checked");

    this.todosArray = [];
    this.checkedArray = [];

    this.addForm.addEventListener("submit", this.onSubmitHandler);
    this.todosList.addEventListener("click", this.onTodosListHandler);
  }

  uploadStorage() {
    localStorage.setItem("todos", JSON.stringify(this.todosArray));
    localStorage.setItem("checked", JSON.stringify(this.checkedArray));
  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    const todoName = this.input.value;
    if (todoName === "") {
      return;
    }

    this.input.value = "";
    const todoObj = {
      name: todoName,
      id: Date.now(),
    };
    this.todosArray.push(todoObj);
    this.createHTML(todoObj);
    this.updateTaskCount();
    this.uploadStorage();
  };

  createHTML(todoObj) {
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
    this.items.appendChild(li);
  }

  check(id) {
    const itemName = document.querySelector(
      `.item__name[data-id='${id}']`
    ).innerText;
    const itemObj = {
      name: itemName,
      id: id,
    };

    if (
      this.checkedArray.some(
        (item) => JSON.stringify(item) === JSON.stringify(itemObj)
      )
    ) {
      const index = this.checkedArray.findIndex((item) => item.id === id);
      this.checkedArray.splice(index, 1);
    } else {
      this.checkedArray.push(itemObj);
    }

    this.uploadStorage();
  }

  delete(id) {
    const deleteTodo = document.querySelector(`.item[data-id='${id}']`);
    deleteTodo.remove();
    this.todosArray = this.todosArray.filter((todo) => todo.id !== +id);
    this.checkedArray = this.checkedArray.filter((todo) => +todo.id !== +id);
    this.updateTaskCount();
    this.uploadStorage();
  }

  onTodosListHandler = (event) => {
    const itemType = event.target;
    const id = itemType.dataset.id;
    if (itemType.className === "fas fa-check") {
      this.check(id);
    } else if (itemType.className === "far fa-times-circle") {
      this.delete(id);
    }
  };

  updateTaskCount() {
    const arrayLength = this.todosArray.length;
    if (arrayLength <= 1) {
      this.itemCount.innerText = `${arrayLength} task`;
    } else {
      this.itemCount.innerText = `${arrayLength} tasks`;
    }
  }

  uploadSavedTodos() {
    if (this.savedTodos) {
      const parsedSavedTodos = JSON.parse(this.savedTodos);
      this.todosArray = parsedSavedTodos;
      parsedSavedTodos.forEach((todo) => this.createHTML(todo));
      this.updateTaskCount();
    }
  }

  uploadSavedChecked() {
    if (this.savedChecked) {
      const parsedSavedChecked = JSON.parse(this.savedChecked);
      this.checkedArray = parsedSavedChecked;
      parsedSavedChecked.forEach((checkedTodo) => {
        const checkTodo = document.querySelector(`#cb${checkedTodo.id}`);
        checkTodo.checked = true;
      });
    }
  }
}
