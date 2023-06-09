const timeslotsContainer = document.getElementById('timeslots');
const bookedTimeslots = ['2023-06-05T10:00:00']; // Заброньовані часи (приклад)
const currentDate = new Date(); // Поточна дата

// Функція для форматування дати у вигляді "Місяць DD"
function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
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
  const date = new Date();
  date.setDate(currentDate.getDate() + i);
  const formattedDate = formatDate(date);
  const shortDayOfWeek = getShortDayOfWeek(date);

  const container = document.createElement('div');
  container.classList.add('container');

  const dateLabel = document.createElement('div');
  dateLabel.textContent = formattedDate;
  dateLabel.classList.add('date');
  container.appendChild(dateLabel);

  const dayOfWeekLabel = document.createElement('div');
  dayOfWeekLabel.textContent = shortDayOfWeek;
  dayOfWeekLabel.classList.add('day');
  container.appendChild(dayOfWeekLabel);

  const timeslotsContainer = document.createElement('div');
  timeslotsContainer.classList.add('timeslots');

  for (let j = 10; j <= 18; j += 2) {
    const timeslot = document.createElement('div');
    timeslot.textContent = `${j}:00`;
    timeslot.classList.add('timeslot');
    if (bookedTimeslots.includes(`${date.toISOString().slice(0, 10)}T${j}:00:00`)) {
      timeslot.classList.add('booked');
    } else {
      timeslot.addEventListener('click', selectTimeslot);
    }
    timeslotsContainer.appendChild(timeslot);
  }

  container.appendChild(timeslotsContainer);
  document.getElementById('timeslots').appendChild(container);
}

// Обробник події для вибору часового слоту
function selectTimeslot(event) {
  const selectedSlot = document.querySelector('.timeslot.selected');
  if (selectedSlot) {
    selectedSlot.classList.remove('selected');
  }
  event.target.classList.add('selected');
}



<script>
    document.querySelector('.timeslot.selected').addEventListener('click', function() {
      document.querySelector('.dialog-container').style.display = 'block';
    });

    document.querySelector('.dialog-close').addEventListener('click', function() {
      document.querySelector('.dialog-container').style.display = 'none';
    });
  </script>