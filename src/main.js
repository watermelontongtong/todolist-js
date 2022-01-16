"use strict";

import Today from "./updateDate.js";
import { TaskState, stateClassName } from "./taskState.js";
import ToDoList from "./todoList.js";

const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active");
const completedBtn = document.querySelector(".completed");

const FUNCTION_REMOVE = "remove";
const FUNCTION_ADD = "add";

const date = new Today();
date.update();
setInterval(date.update, 1000);

const todoList = new ToDoList();
todoList.uploadSavedTodos();
todoList.uploadSavedChecked();

const taskState = new TaskState(todoList.todosArray, todoList.checkedArray);
taskState.setClickListener((className) => {
  switch (className) {
    case stateClassName.active:
      taskState.selectClassHandler(activeBtn, allBtn, completedBtn);
      taskState.hiddenClassHandler(todoList.todosArray, FUNCTION_REMOVE);
      taskState.hiddenClassHandler(todoList.checkedArray, FUNCTION_ADD);
      break;
    case stateClassName.completed:
      taskState.selectClassHandler(completedBtn, activeBtn, allBtn);
      taskState.hiddenClassHandler(todoList.todosArray, FUNCTION_ADD);
      taskState.hiddenClassHandler(todoList.checkedArray, FUNCTION_REMOVE);
      break;
    case stateClassName.all:
      taskState.selectClassHandler(allBtn, completedBtn, activeBtn);
      taskState.hiddenClassHandler(todoList.todosArray, FUNCTION_REMOVE);
      break;
    default:
      throw new Error("not valid state");
  }
});
