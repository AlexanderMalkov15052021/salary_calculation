const buttonArr = [...document.getElementsByTagName("button")],
      propertiesHiddenObjects_1 = {
        "Количество дней": "кл-во.",
        "Стаж": "лет",
        "Доход за два года": "руб."
      },
      propertiesHiddenObjects_2 = {
        "Количество дней": "кл-во.",
        "Доход за один года": "руб."
      };

let input = document.getElementsByTagName("input"),
    itemName = document.getElementsByClassName('itemName'),
    objectData = {};

const setHiddenItem = (iterableObject, elemNumber) => {
  for (let key in iterableObject) {
    itemName[elemNumber].insertAdjacentHTML("afterEnd", `<div class="itemName nameHiddenItem hiddenItem">${key}:</div>`);
    input[elemNumber].insertAdjacentHTML("afterEnd", `<input type="number" class="nameHiddenItem hiddenItem"
      placeholder="${iterableObject[key]}" min="0" />`);
  }
}

const getIndexItemName = (index) => {
  let indexNum = null;
  [].map.call(itemName, (obj, i) => {
    if (obj === buttonArr[index]) {
      indexNum = i;
   }
  });
  return indexNum;
}

setHiddenItem(propertiesHiddenObjects_1, getIndexItemName(0));
setHiddenItem(propertiesHiddenObjects_2, getIndexItemName(1));

input = Array.from(input);
itemName = Array.from(itemName);

const getIterationEnd = (elem) => {
  let indexNumber = itemName.indexOf(buttonArr[buttonArr.indexOf(elem) + 1]);
  return itemName.includes(buttonArr[buttonArr.indexOf(elem) + 1]) > 0 ? indexNumber : itemName.length;
}

const toggleHiddenItem = (eventTarget) => {
  if (eventTarget.target.localName === "button") {
    let iterationEnd = getIterationEnd(eventTarget.target);
    for (let i = itemName.indexOf(eventTarget.target) + 1; i < iterationEnd; i++) {
      itemName[i].classList.toggle("hiddenItem");
      input[i].classList.toggle("hiddenItem");
    }
    eventTarget.target.lastChild.classList.toggle("arrowChange");
  }
};

container.addEventListener("click", toggleHiddenItem);

document.querySelector(".preload").classList.remove("preload");
