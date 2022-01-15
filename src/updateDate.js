"use strict";

export default class Today {
  constructor() {
    this.todaysDate = document.querySelector(".header__date");
  }

  update = () => {
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

    this.todaysDate.innerText = `${dayInLetter} ${monthInLetter} ${date} ${year}`;
  };
}
