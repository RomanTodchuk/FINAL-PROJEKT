// загальні змінні (раніше використовували Var)
const timeslotsContainer = document.getElementById('timeslots');//дозволяє знайти елемент з атрибутом id = "timeslots" у документі (main .html). Якщо такий елемент існує, він буде збережений у змінну timeslotsContainer, що дозволить подальше маніпулювання або взаємодію з цим елементом.
const bookedTimeslots = ['2023-06-05T10:00:00']; // Заброньовані часи (приклад)
const currentDate = new Date(); // Поточна дата

// Функція для форматування дати у вигляді "DD Місяць"
function formatDate(date) { 

  const day = String(date.getDate()).padStart(2, '0');// прибавляє "0" перед числами 1-9 в дні місяця
  const monthNames = ['Січ', 'Лют', 'Бер', 'Квіт', 'Трав', 'Черв', 'Лип', 'Серп', 'Вер', 'Жовт', 'Лист', 'Груд'];
  const month = monthNames[date.getMonth()];
  return `${day} ${month} `;
}

// Функція для отримання скороченого дня тижня
function getShortDayOfWeek(date) {
  const dayOfWeekNames = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  return dayOfWeekNames[date.getDay()];
}

// Генерація слотів для 14 днів
for (let i = 0; i < 14; i++) {
  const date = new Date(); //створюємо змінну date. в якій створюється новий об'єкт типу Date 
  date.setDate(currentDate.getDate() + i); //встановлюємо день місяця для об'єкту date шляхом додавання значення "i" до поточного дня місяця
  const formattedDate = formatDate(date); //створюємо змінну formattedDate зі значенням яке присвоюється їй викликом функції formatDate() з переданим аргументом date 
  const shortDayOfWeek = getShortDayOfWeek(date); //створюємо змінну shortDayOfWeek зі значенням яке присвоюється їй викликом функції getShortDayOfWeek() з переданим аргументом date 

    // створюємо контейнер div в html файл, в цьому контейнері буде розташована сама таблиця з 3 трьома контейнерами
  const container = document.createElement('div');// створюємо змінну "container" зі значенням яке присвоюється їй об"єктом document та методом createElement
  container.classList.add('container'); //задаєм до елементу "container" властивістю  "classList" методом "add" класу 'container' з файлу .css, стилі і вигляд  

    // створюємо контейнер div в html файл, в цьому контейнері буде розташовані дати
  const dateLabel = document.createElement('div'); //створюємо змінну "dateLabel" зі значенням яке присвоюється їй об"єктом document та методом createElement
  dateLabel.textContent = formattedDate; //значення змінної formattedDate присвоюємо до властивості textContent елемента dateLabel 
  dateLabel.classList.add('date');//задаєм до елементу "dateLabel" властивістю  "classList" методом "add" класу 'date' з файлу .css, стилі і вигляд
  container.appendChild(dateLabel); //додаємо елемент "dateLabel" як дочірнього до елемента "container"
    
    // створюємо контейнер div в html файл, в цьому контейнері буде розташовані дні тижня
  const dayOfWeekLabel = document.createElement('div'); //як в попередньому діві
  dayOfWeekLabel.textContent = shortDayOfWeek; //значення змінної formattedDate присвоюємо до властивості textContent елемента dateLabel
  dayOfWeekLabel.classList.add('day'); //задаєм до елементу "dayOfWeekLabel" властивістю  "classList" методом "add" класу 'day' з файлу .css, стилі і вигляд
  container.appendChild(dayOfWeekLabel); //додаємо елемент "dayOfWeekLabel" як дочірнього до елемента "container"
    
    // створюємо контейнер div в html файл, в цьому контейнері буде розташовані часові слоти
  const timeslotsContainer = document.createElement('div'); //cтворюєм кнтейнер (коробку для манюніх ячеєк)
  timeslotsContainer.classList.add('timeslots'); //присвоюємо стиль з css
    
    //створюємо контейнер div в html файл, в цьому контейнері буде розташовані часові слоти
  for (let j = 10; j <= 18; j += 2) {  //логіка що відображати юзеру (які є години)
    const timeslot = document.createElement('div'); //cтворюєм кнтейнер (манюню ячейку)
    timeslot.textContent = `${j}:00`; // призначаєм як саме має відображатись елемент timeslot (вигляд числа)
    timeslot.classList.add('timeslot'); //присвоюємо стиль з css для маленької ячейки
    if (bookedTimeslots.includes(`${date.toISOString().slice(0, 10)}T${j}:00:00`)) { // погратися з цим іще
      timeslot.classList.add('booked'); //присвоюємо стиль з css - booked
    } else {
      timeslot.addEventListener('click', selectTimeslot);
    }
    timeslotsContainer.appendChild(timeslot); //додаємо елемент timeslot як дочірнього до елемента timeslotsContainer
  }
  container.appendChild(timeslotsContainer); //додаємо елемент timeslotsContainer як дочірнього до елемента Container
  document.getElementById('timeslots').appendChild(container); // getElementById('timeslots')шукає на сторінці <div id="timeslots"> а appendChild  додає елемент "container" як дочірній до елементу "timeslots"
}

// Обробник події для вибору часового слоту
function selectTimeslot(event) {
  const selectedSlot = document.querySelector('.timeslot.selected');//Використовуючи document.querySelector, знаходимо перший елемент з класом 'timeslot', який також має клас 'selected' і зберігаємо його у змінну selectedSlot.
  if (selectedSlot) //Перевіряємо, чи існує selectedSlot (тобто, чи був вибраний якийсь часовий слот).
  {  
    selectedSlot.classList.remove('selected'); //Якщо selectedSlot існує (тобто, якийсь часовий слот був вибраний), видаляємо клас 'selected' з елемента selectedSlot за допомогою selectedSlot.classList.remove('selected'). Це забезпечує скасування виділення вибраного слоту.
  }
  event.target.classList.add('selected');//присвоюємо стиль з css selected
  openDialog(); //Викликає функцію що відображає діалогове вікно.
  const selectedCell = document.querySelector('.selected-cell');//находимо перший елемент з класом 'selected-cell' за допомогою document.querySelector і зберігаємо його у змінну selectedCell
selectedCell.addEventListener('click', selectTimeslot); //Додаємо обробник події click до елемента selectedCell, який викликає функцію selectTimeslot. Це забезпечує можливість знову вибирати часовий слот після відкриття діалогового вікна.

}
// подія  діалогового вікна */
function openDialog() {
  document.querySelector('.dialog-container').style.display = 'block'; //встановлює стиль display елементу з класом .dialog-container на block. Це робить діалогове вікно видимим.
}

document.querySelector('.timeslots').addEventListener('click', function() {
    document.querySelector('.dialog-container').style.display = 'block'; //Обробник події для елементу з класом .timeslots виконує функцію, яка також встановлює стиль display елементу з класом .dialog-container на block. Це означає, що при кліку на елемент .timeslots, діалогове вікно стає видимим.
    });

document.querySelector('.dialog-close').addEventListener('click', function() {
    document.querySelector('.dialog-container').style.display = 'none'; // Обробник події для елементу з класом .dialog-close виконує функцію, яка встановлює стиль display елементу з класом .dialog-container на none. Це означає, що при кліку на елемент .dialog-close, діалогове вікно приховується.
    });
