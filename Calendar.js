function reload(){
    document.getElementsByTagName("header")[0].style = "transform:translateY(0px)";}

function Fix() {
    var header = document.getElementById("Header");
    var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

function Close(){
    document.getElementsByClassName('profile')[0].style = "left:325px;opacity:0";
}
function Open(){
    document.getElementsByClassName('profile')[0].style = "left:0px;opacity:1";
}
document.addEventListener('DOMContentLoaded', () => {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthYearDisplay = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const reminderDisplay = document.getElementById('reminder-display');

    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth();
    let selectedDate = null;
    let reminders = JSON.parse(localStorage.getItem('reminders')) || {};

    const renderCalendar = (year, month) => {
        calendarGrid.querySelectorAll('.day-cell').forEach(cell => cell.remove());
        
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        
        monthYearDisplay.textContent = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' });

        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day-cell', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        for (let i = 1; i <= lastDate; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('day-cell');
            dayCell.dataset.date = `${year}-${month + 1}-${i}`;

            const dayNumber = document.createElement('div');
            dayNumber.classList.add('day-number');
            dayNumber.textContent = i;
            dayCell.appendChild(dayNumber);
            
            const dateString = dayCell.dataset.date;
            if (reminders[dateString]) {
                const symbol = document.createElement('div');
                symbol.classList.add('reminder-symbol');
                symbol.textContent = '✎';
                dayCell.appendChild(symbol);
                dayCell.classList.add('day-cell-color');
            }

            dayCell.addEventListener('click', () => {
                const allCells = document.querySelectorAll('.day-cell');
                allCells.forEach(cell => cell.classList.remove('selected'));
                dayCell.classList.add('selected');
                selectedDate = dayCell.dataset.date;
                displayReminder(selectedDate);
            });

            calendarGrid.appendChild(dayCell);
        }
    };

    const displayReminder = (date) => {
        const reminderContent = reminders[date] || '';
        
        reminderDisplay.innerHTML = `
            <h3>Reminder for ${new Date(date).toDateString()}</h3>
            <textarea id="reminder-text-area">${reminderContent}</textarea>
            <div class="reminder-actions">
                <button id="save-button" class="action-button">Save</button>
                <button id="delete-button" class="action-button">Delete</button>
            </div>
        `;

        document.getElementById('save-button').onclick = () => {
            const newReminder = document.getElementById('reminder-text-area').value.trim();
            if (newReminder) {
                reminders[date] = newReminder;
            } else {
                delete reminders[date];
            }
            localStorage.setItem('reminders', JSON.stringify(reminders));
            renderCalendar(currentYear, currentMonth);
            displayReminder(date);
        };

        document.getElementById('delete-button').onclick = () => {
            delete reminders[date];
            localStorage.setItem('reminders', JSON.stringify(reminders));
            renderCalendar(currentYear, currentMonth);
            reminderDisplay.innerHTML = '<p class="initial-message">Select a date to view or add a reminder.</p>';
        };
    };

    prevMonthButton.onclick = () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    };

    nextMonthButton.onclick = () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    };

    renderCalendar(currentYear, currentMonth);
});