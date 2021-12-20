/*Фунция для отображения даты и времени, модуль для Сени*/
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const months = ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    
    timeEl.innerHTML = (hour < 10? '0'+ hour : hour) + ':' + (minutes < 10? '0'+ minutes: minutes)

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);
/*Конец модуля*/

/*Сейчас внимательно, т.к. несколько модулей идут в одном объекте */
/*Леша, создашь этот объект и добавишь туда функцию fetchWeather и search(у тебя есть кусок search будет внизу, я помечу) */
let weather = {
    "apiKey": "5b2128d63c305eb8b79256d63d130931",
    fetchWeather: function (city) {
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&lang=ru&units=metric&appid=" + this.apiKey).then((response) => response.json()).then((data) => this.displayWeather(data));
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }, /*Конец модуля */
    /*Модуль отображения инфы на странице, возьму себе */
    displayWeather: function(data)
    {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity, feels_like } = data.main;
        const { speed } = data.wind;    
        document.querySelector(".city").innerText = "Погода в городе " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".feels_like").innerText = "Ощущается как " + feels_like + "°C";
        document.querySelector(".humidity").innerText = "Влажность: " + humidity + "%";
        document.querySelector(".wind").innerText = "Скорость ветра: " + speed + "м/с";
        document.querySelector(".weather").classList.remove("loading");
    }
};
/*Конец модуля */

/*Вот еще кусок для Леши*/
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});
document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Минск");
/*Ну и вызов функции тоже можешь дописать */