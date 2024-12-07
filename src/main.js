import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// #region Settings and basic functions

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
        
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};

function normalizeDate(date) {
    date = `${date}`;
    if (date.length < 2) {
        return `0${date}`;
    } else {
        return date;
    }
};

let chosenDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        chosenDate = selectedDates[0].getTime(); 
        calendar.verifyDate(selectedDates[0]);
    },
};

// #endregion Settings and basic functions

// #region Timer

const calendar = {
    dateInput: document.querySelector('#datetime-picker'),
    button: document.querySelector('.calendar-container button[data-start]'),
    verifyDate(date) {
        if (date.getTime() > Date.now()) {
            calendar.button.dataset.start = 'active';
        } else {
            this.alert();  
            calendar.button.dataset.start = 'inactive';
        }
    },
    invalidDateAlert() {
        iziToast.warning({
            title: 'Invalid date',
            message: 'Please choose a date in the future',
            position: 'topRight',
            color: 'red',
            iconUrl: './img/close-outlined.svg',
            timeout: 5000,
        })
    },
}

const timer = {
    days: document.querySelector('.timer span[data-days]'),
    hours: document.querySelector('.timer span[data-hours]'),
    minutes: document.querySelector('.timer span[data-minutes]'),
    seconds: document.querySelector('.timer span[data-seconds]'),
    setTimer() {
        if (calendar.button.dataset.start === 'active') {
            let initialDate = Date.now();
            const intervalId = setInterval(() => {
                let { days, hours, minutes, seconds } = convertMs(chosenDate - initialDate);

                timer.days.textContent = normalizeDate(days);
                timer.hours.textContent = normalizeDate(hours);
                timer.minutes.textContent = normalizeDate(minutes);
                timer.seconds.textContent = normalizeDate(seconds);

                initialDate += 1000;

                if (!(chosenDate - initialDate >= 0)) {
                    clearInterval(intervalId);
                    iziToast.success({
                        title: 'Succes',
                        message: 'Timer has ended',
                        position: 'topRight',
                        timeout: 5000,
                    })
                }
            }, 1000)
        } else {
            calendar.invalidDateAlert();
        }
    },
}

flatpickr('#datetime-picker', options);
calendar.button.addEventListener('click', timer.setTimer);

// #endregion Timer