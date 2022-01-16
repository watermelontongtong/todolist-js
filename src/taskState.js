"use strict";

const CLASS_SELECT = "select";
const CLASS_HIDDEN = "hidden";
const FUNCTION_REMOVE = "remove";
const FUNCTION_ADD = "add";

export const stateClassName = Object.freeze({
  active: "active",
  completed: "completed",
  all: "all",
});

export class TaskState {
  constructor() {
    this.buttons = document.querySelector(".header__task-state");
    this.buttons.addEventListener("click", (event) => {
      const buttonClassName = event.target.className;
      if (buttonClassName === "active") {
        this.onClick && this.onClick(stateClassName.active);
      } else if (buttonClassName === "completed") {
        this.onClick && this.onClick(stateClassName.completed);
      } else if (buttonClassName === "all") {
        this.onClick && this.onClick(stateClassName.all);
      }
    });
  }

  setClickListener(onClick) {
    this.onClick = onClick;
  }

  selectClassHandler(addBtn, removeBtn1, removeBtn2) {
    addBtn.classList.add(CLASS_SELECT);
    removeBtn1.classList.remove(CLASS_SELECT);
    removeBtn2.classList.remove(CLASS_SELECT);
  }

  hiddenClassHandler(array, action) {
    array.forEach((todo) => {
      const todoList = document.querySelector(`.item[data-id='${todo.id}']`);
      if (action === FUNCTION_REMOVE) {
        todoList.classList.remove(CLASS_HIDDEN);
      } else if (action === "add") {
        todoList.classList.add(CLASS_HIDDEN);
      }
    });
  }
}
