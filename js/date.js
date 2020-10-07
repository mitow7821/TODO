document.addEventListener('DOMContentLoaded', () => {
    //GET DOM ELEMENTS
    let godzina = document.querySelector('.godzina');
    let dayOfTheWeek = document.querySelector('.day');
    let fullData = document.querySelector('.fullData');
    //GET CURRENT DATE
    let now;
    let minutes;
    let seconds;
    let hour;
    const showTime = function () {
        now = new Date();
        minutes = leadingZero(now.getMinutes());
        seconds = leadingZero(now.getSeconds());
        hour = leadingZero(now.getHours());
        godzina.innerHTML = `${hour}:${minutes}:${seconds}`;
    }
    showTime()

    const year = now.getFullYear();
    const month = leadingZero(now.getMonth() + 1);
    const day = leadingZero(now.getDate());
    let dayName = now.getDay()
    const days = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

    function leadingZero(i) {
        return (i < 10) ? "0" + i : i;
    }

    dayOfTheWeek.innerHTML = days[dayName];
    fullData.innerHTML = `${day}-${month}-${year}`;

    //UPDATE DATE
    setInterval(() => {
        showTime()
    }, 1000)
});
