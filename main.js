const addForm = document.querySelector("form");
const input = document.querySelector(".input-add");
const items = document.querySelector(".items");
const todaysDate = document.querySelector(".header__date");
const itemCount = document.querySelector(".header__task-count");

let itemsArray = [];

function onSubmitHandler(event) {
  event.preventDefault();
  const item = input.value;
  input.value = "";
  itemsArray.push(item);
  itemCount.innerText = `${itemsArray.length} tasks`;
  console.log(itemsArray);
  createHTML(item);
}

function createHTML(item) {
  const id = Date.now();
  const li = document.createElement("li");
  li.setAttribute("class", "item");
  li.innerHTML = `
    <div class="item__left">
        <input class="item__check" id="cb${id}" type="checkbox" />
        <label for="cb${id}"><i class="fas fa-check"></i></label>
        <span class="item__name">${item}</span>
    </div>
    <button class="item__delete">
         <i class="far fa-times-circle"></i>
    </button>
    `;
  items.appendChild(li);
}

addForm.addEventListener("submit", onSubmitHandler);

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

setInterval(updateDate, 1000);
