// Функція оновлення форми бронювання з інформацією про обраний слот
function updateBookingForm(date, day, time) {
    const bookingInfo = `Дата: ${date}, День: ${day}, Час: ${time}`;
    document.getElementById('booking-info').textContent = bookingInfo;
    document.getElementById('dialog-form').style.display = 'block';
}

// Function to handle booking confirmation
function confirmBooking() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    // Update the HTML content with the booked slot information
    const bookingInfo = document.getElementById('booking-info').textContent;
    const bookedSlot = document.createElement('p');
    bookedSlot.textContent = `Бронювання: ${bookingInfo}, Ім'я: ${name}, Телефон: ${phone}`;
    document.body.appendChild(bookedSlot);

    // Make the selected slot unavailable for booking
    const selectedSlot = document.querySelector('.slot.selected');
    selectedSlot.classList.remove('selected');
    selectedSlot.classList.add('booked');
    selectedSlot.removeEventListener('click', selectSlot);

    // Reset the form
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('booking-info').textContent = '';
    document.getElementById('dialog-form').style.display = 'none';
}

// Function to handle slot selection
function selectSlot() {
    const selectedSlot = document.querySelector('.slot.selected');
    if (selectedSlot) {
        selectedSlot.classList.remove('selected');
    }
    this.classList.add('selected');
    updateBookingForm(this.parentNode.dataset.date, this.parentNode.dataset.day, this.textContent);
}

// Populate the table with slots
const table = document.getElementById('booking-table');
const today = new Date();

for (let i = 0; i < 14; i++) {
    const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
    const row = table.insertRow(-1);
    row.dataset.date = formatDate(date);
    row.dataset.day = formatDay(date);

    const dayOfWeek = getDayOfWeek(date);
    const timeSlots = ['10:00', '12:00', '14:00', '16:00', '18:00'];
    const slotsCount = timeSlots.length;

    const cellDate = row.insertCell(0);
    cellDate.textContent = formatDate(date);

    const cellDay = row.insertCell(1);
    cellDay.textContent = dayOfWeek;

    for (let j = 0; j < slotsCount; j++) {
        const slotCell = row.insertCell(j + 2);
        slotCell.classList.add('slot', 'available');
        slotCell.textContent = timeSlots[j];
        slotCell.addEventListener('click', selectSlot);
    }
}

// Format date as "dd.mm.yyyy"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${day}.${month}`;
}

// Format day as "dd"
function formatDay(date) {
    const day = String(date.getDate()).padStart(2, '0');
    return day;
}

// Get day of week as two-letter abbreviation
function getDayOfWeek(date) {
    const daysOfWeek = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return daysOfWeek[date.getDay()];
}

// Attach event listener to the "Confirm Booking" button
document.getElementById('confirm-booking').addEventListener('click', confirmBooking);