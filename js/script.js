const roundingNumber = (num) => Math.floor(num*100) / 100;

const tdEven = document.querySelectorAll("td:nth-child(even)");

let itemsArray = [];

const getData = () => {
  input.forEach((item, i) => {
    objectData[`item_${i+1}`] = Number(item.value);
  });
};

const calculateExperience = () => {  // вычисление стажа
  if(objectData.item_10 >= 8) {
    return 1;
  }
  else if (objectData.item_10 >= 5) {
    return .8;
  }
  else {
    return .6;
  }
};

const setMedical = (laborSickLeave, minimumSickLeave) => {  // вычисление суммы больничного
  if (laborSickLeave > minimumSickLeave && objectData.item_9 != 0 && objectData.item_10 != ""
    && objectData.item_11 != "") {
    objectData.item_8 = roundingNumber(laborSickLeave);
    return laborSickLeave;
  }
  else if (objectData.item_9 != "" && objectData.item_10 != 0 && objectData.item_11 != "") {
    objectData.item_8 = minimumSickLeave;
    return minimumSickLeave;
  }
  else {
    return 0;
  }
}

const setDiwntime = (downtimeResult) => {
  if (downtimeResult > "") {
    objectData.item_12 = downtimeResult;
    return downtimeResult;
  }
  else if (objectData.item_12 > "") {
    downtimeResult = objectData.item_12;
    return objectData.item_12;
  }
  else {
    objectData.item_12 = "";
    return 0;
  }
}

const getCalculation = (calculationResult) => {
  if (objectData.item_5 == "" && (objectData.item_1 != "" || objectData.item_2 != "")) {
    return "Укажите премию!";
  }
  else if ((objectData.item_1 == "" || objectData.item_2 == "") &&
           (objectData.item_9 == "" || objectData.item_10 == "" || objectData.item_11 == "") &&
           (objectData.item_13 == "" || objectData.item_14 == "") && objectData.item_8 == "" &&
           objectData.item_12 == "") {
    return "Заполните обязательные поля!";
  }
  else {
    return `К выплате: ${roundingNumber(calculationResult)}`;
  }
};

const createItemsArray = (dataItemsArray) => {
  itemsArray = [];
  return (dataItemsArray) => {
    return itemsArray[itemsArray.push(dataItemsArray) - 1];
  };
};

const calculate = () => {
  const closureingItems = createItemsArray(),
        hours = closureingItems(objectData.item_2 * 22),  // часы
        salary = closureingItems(objectData.item_1 * hours),  // оклад
        night = closureingItems(objectData.item_2 * 8 * objectData.item_1 / 5),  // ночные
        harmful = closureingItems(salary / 100 * 4),  // вредные
        overtime = closureingItems(objectData.item_3 * (objectData.item_1 / 2)),  // перереаботка
        holidays = closureingItems(objectData.item_4 * objectData.item_1),  // праздничные
        averageEarnings = objectData.item_9 / 730,  // средний доход
        laborSickLeave = averageEarnings * calculateExperience() * objectData.item_11,  // больничный
        minimumSickLeave = 307008 / 730 * calculateExperience(),  // минимальный больничный
        medical = closureingItems(setMedical(laborSickLeave, minimumSickLeave)),  // отображение больничный к выплате
        nightSalary = salary + night,
        prize = closureingItems(nightSalary*(objectData.item_5 / 100)),  // премия
        // районный коэффициент
        ratio = closureingItems(Math.round((prize + nightSalary + overtime + harmful + holidays) * 0.3 * 100) / 100),
        beforeTax = closureingItems(prize + nightSalary + overtime + harmful + holidays + ratio + objectData.item_8),

        annualAverage = objectData.item_13 / 240,  // средняя зарплата за год
        downtimeResult = annualAverage / 3 * 2 * objectData.item_14,
        downtime = closureingItems(setDiwntime(downtimeResult)),

        tax = closureingItems(Math.round((Math.floor(beforeTax) + downtimeResult + downtime) / 100 * 13)),
        calculationResult = beforeTax - tax - objectData.item_6 - objectData.item_7 + downtime;

  itemsArray.forEach((item, index) => {
    tdEven[index].innerHTML = roundingNumber(item);
  });

  return getCalculation(calculationResult);
};

const getResult = () => {
  getData();

  result.innerHTML = calculate();

  document.getElementsByClassName('containerTable')[0].classList.add("containerTableOpaque");
}

buttonArr[2].addEventListener("click", getResult);
