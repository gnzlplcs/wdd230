// -------------DATE---------------

let myData = new Date(document.lastModified);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let result = `${weekdays[myData.getDay()]}, ${myData.getDate()} ${months[myData.getMonth()]} ${myData .getFullYear()}`;
document.getElementById('lastUpdate').innerHTML = result;

// ------------Friday banner--------------
const currentDate = new Date();
let today = currentDate.getDay();
let element = document.getElementById('friday-banner');
if (today == 5) {
    element.style.display = "block";
}

// ----------------Font --------------------
WebFont.load({
    google: {
        families: ['Work Sans', 'Neuton', 'Asul']
    }
});

// ------------RATING----------------
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}

// Toggle nav 
function toggle() {
    document.getElementById('nav-menu').classList.toggle('hide');
}

// ---------------------JS Gallery----------------
const imgOptions = {
    threshold: 1,
    rootmargin: "0px 0px -300px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            preloadImage(entry.target);
            imgObserver.unobserve(entry.target);
        }
    })
}, imgOptions)

let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
        loadImages(img);
    });
}


// ---------------Home JSON Request-----------------------
const homeRequestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(homeRequestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == 'Fish Haven' || towns[i].name == 'Preston' || towns[i].name == 'Soda Springs') {
                let card = document.createElement('section');
                let divText = document.createElement('div');
                let divImg = document.createElement('div');
                let h2 = document.createElement('h2');
                let motto = document.createElement('p');
                let yearFounded = document.createElement('p');
                let population = document.createElement('p');
                let annualRainFall = document.createElement('p');
                let image = document.createElement('img');
                divText.className = "textContainer";
                divImg.className = "imgContainer";
                h2.textContent = towns[i].name;
                motto.className = 'motto';
                motto.textContent = towns[i].motto;
                yearFounded.textContent = `Year Founded: ${towns[i].yearFounded}`;
                population.textContent = `Population: ${towns[i].currentPopulation}`;
                annualRainFall.textContent = `Annual Rain Fall: ${towns[i].averageRainfall}`;
                image.setAttribute('src', 'images/' + towns[i].photo);
                divText.appendChild(h2);
                divText.appendChild(motto);
                divText.appendChild(yearFounded);
                divText.appendChild(population);
                divText.appendChild(annualRainFall);
                divImg.appendChild(image);
                card.appendChild(divText);
                card.appendChild(divImg);
                document.querySelector('div.cards-home').appendChild(card);
            }

        }
    })

// ---------------JSON Request-----------------------
let prestonCityID = 5604473;    
let sodaSpringsCityID = 5607916;
let fishHavenCityID = 5585010;
let appid = "96903c0c4a665e1829d511ed75451893";

// ----------Preston Weather Summary-------------
const prestonRequestURLweather = `https://api.openweathermap.org/data/2.5/weather?id=${prestonCityID}&appid=${appid}&units=imperial`;

fetch(prestonRequestURLweather)
    .then((response) => response.json())
    .then((jsonObject) => {
        console.log(jsonObject);
        document.getElementById('p-temperature').textContent = `${jsonObject.weather[0].main}, ${jsonObject.main.temp.toFixed(0)}`;
        document.getElementById('p-max-temp').textContent = jsonObject.main.temp_max.toFixed(0);
        document.getElementById('p-min-temp').textContent = jsonObject.main.temp_min.toFixed(0);
        document.getElementById('p-humidity').textContent = jsonObject.main.humidity;
        document.getElementById('p-wind').textContent = jsonObject.wind.speed;

        // -------------------Setting up Wind Chill----------------
        let t = parseFloat(jsonObject.main.temp);
        let s = parseFloat(jsonObject.wind.speed);
        let f = calc(t, s);

        function calc(x, y) {
            let result = 35.74 + (0.6215 * x) - (35.75 * Math.pow(y, 0.16)) + (0.4275 * x * Math.pow(y, 0.16));
            return result.toFixed(0);
        }
        let finalResult = (t <= 50 && s > 3) ? `${f}°F` : 'N/A';
        document.getElementById('p-windchill').textContent = finalResult;
    });

// -------------Preston Forecast------------
const prestonRequestURLforecast = `https://api.openweathermap.org/data/2.5/forecast?id=${prestonCityID}&appid=${appid}&units=imperial`;

fetch(prestonRequestURLforecast)
    .then((response) => response.json())
    .then((jsonObject) => {
        // ----------------Declaring variables---------------
        const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let daysArray = [];
        let iconsArray = [];
        let descIconArray = [];
        let tempArray = [];

        // --------------Setting up arrays----------------------
        for (let i = 0; i < jsonObject.list.length; i++) {
            if (jsonObject.list[i].dt_txt.indexOf('18:00:00') > -1) {
                let tempDay = new Date(jsonObject.list[i].dt_txt);
                daysArray.push(dayOfWeek[tempDay.getDay()]);
                iconsArray.push(jsonObject.list[i].weather[0].icon);
                descIconArray.push(jsonObject.list[i].weather[0].description)
                tempArray.push(jsonObject.list[i].main.temp);
            }
        }

        for (let i = 0; i < tempArray.length; i++) {
            // --------------Creating HTML elements--------------------
            let divCard = document.createElement('div');
            let dayP = document.createElement('p');
            let iconImg = document.createElement('img');
            let tempP = document.createElement('p');
            divCard.className = "forecast-day";
            dayP.setAttribute('id', `p-dayOfWeek${i + 1}`);
            iconImg.setAttribute('id', `p-icon${i + 1}`);
            tempP.setAttribute('id', `p-temp${i + 1}`);
            divCard.appendChild(dayP);
            divCard.appendChild(iconImg);
            divCard.appendChild(tempP);
            document.getElementById("p-forecast").appendChild(divCard);

            // ------------------Assigning values-----------------
            document.getElementById(`p-dayOfWeek${i + 1}`).textContent = `${daysArray[i]}`;
            document.getElementById(`p-icon${i + 1}`).setAttribute('src', `https://openweathermap.org/img/wn/${iconsArray[i]}@4x.png`);
            document.getElementById(`p-icon${i + 1}`).setAttribute('alt', `${descIconArray[i]} icon`);
            document.getElementById(`p-temp${i + 1}`).textContent = `${tempArray[i].toFixed(0)}°F`;
        }
    });

// ----------Soda Springs Weather Summary-------------
const sodaSpringsRequestURLweather = `https://api.openweathermap.org/data/2.5/weather?id=${sodaSpringsCityID}&appid=${appid}&units=imperial`;

fetch(sodaSpringsRequestURLweather)
    .then((response) => response.json())
    .then((jsonObject) => {
        console.log(jsonObject);
        document.getElementById('ss-temperature').textContent = `${jsonObject.weather[0].main}, ${jsonObject.main.temp.toFixed(0)}`;
        document.getElementById('ss-max-temp').textContent = jsonObject.main.temp_max.toFixed(0);
        document.getElementById('ss-min-temp').textContent = jsonObject.main.temp_min.toFixed(0);
        document.getElementById('ss-humidity').textContent = jsonObject.main.humidity;
        document.getElementById('ss-wind').textContent = jsonObject.wind.speed;

        // -------------------Setting up Wind Chill----------------
        let t = parseFloat(jsonObject.main.temp);
        let s = parseFloat(jsonObject.wind.speed);
        let f = calc(t, s);

        function calc(x, y) {
            let result = 35.74 + (0.6215 * x) - (35.75 * Math.pow(y, 0.16)) + (0.4275 * x * Math.pow(y, 0.16));
            return result.toFixed(0);
        }
        let finalResult = (t <= 50 && s > 3) ? `${f}°F` : 'N/A';
        document.getElementById('ss-windchill').textContent = finalResult;
    });

// -------------Soda Springs Forecast------------
const sodaSpringsRequestURLforecast = `https://api.openweathermap.org/data/2.5/forecast?id=${sodaSpringsCityID}&appid=${appid}&units=imperial`;

fetch(sodaSpringsRequestURLforecast)
    .then((response) => response.json())
    .then((jsonObject) => {
        // ----------------Declaring variables---------------
        const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let daysArray = [];
        let iconsArray = [];
        let descIconArray = [];
        let tempArray = [];

        // --------------Setting up arrays----------------------
        for (let i = 0; i < jsonObject.list.length; i++) {
            if (jsonObject.list[i].dt_txt.indexOf('18:00:00') > -1) {
                let tempDay = new Date(jsonObject.list[i].dt_txt);
                daysArray.push(dayOfWeek[tempDay.getDay()]);
                iconsArray.push(jsonObject.list[i].weather[0].icon);
                descIconArray.push(jsonObject.list[i].weather[0].description)
                tempArray.push(jsonObject.list[i].main.temp);
            }
        }

        for (let i = 0; i < tempArray.length; i++) {
            // --------------Creating HTML elements--------------------
            let divCard = document.createElement('div');
            let dayP = document.createElement('p');
            let iconImg = document.createElement('img');
            let tempP = document.createElement('p');
            divCard.className = "forecast-day";
            dayP.setAttribute('id', `ss-dayOfWeek${i + 1}`);
            iconImg.setAttribute('id', `ss-icon${i + 1}`);
            tempP.setAttribute('id', `ss-temp${i + 1}`);
            divCard.appendChild(dayP);
            divCard.appendChild(iconImg);
            divCard.appendChild(tempP);
            document.getElementById("ss-forecast").appendChild(divCard);

            // ------------------Assigning values-----------------
            document.getElementById(`ss-dayOfWeek${i + 1}`).textContent = `${daysArray[i]}`;
            document.getElementById(`ss-icon${i + 1}`).setAttribute('src', `https://openweathermap.org/img/wn/${iconsArray[i]}@4x.png`);
            document.getElementById(`ss-icon${i + 1}`).setAttribute('alt', `${descIconArray[i]} icon`);
            document.getElementById(`ss-temp${i + 1}`).textContent = `${tempArray[i].toFixed(0)}°F`;
        }
    });

// ----------Fish Haven Weather Summary-------------
const fishHavenRequestURLweather = `https://api.openweathermap.org/data/2.5/weather?id=${fishHavenCityID}&appid=${appid}&units=imperial`;

fetch(fishHavenRequestURLweather)
    .then((response) => response.json())
    .then((jsonObject) => {
        console.log(jsonObject);
        document.getElementById('fh-temperature').textContent = `${jsonObject.weather[0].main}, ${jsonObject.main.temp.toFixed(0)}`;
        document.getElementById('fh-max-temp').textContent = jsonObject.main.temp_max.toFixed(0);
        document.getElementById('fh-min-temp').textContent = jsonObject.main.temp_min.toFixed(0);
        document.getElementById('fh-humidity').textContent = jsonObject.main.humidity;
        document.getElementById('fh-wind').textContent = jsonObject.wind.speed;

        // -------------------Setting up Wind Chill----------------
        let t = parseFloat(jsonObject.main.temp);
        let s = parseFloat(jsonObject.wind.speed);
        let f = calc(t, s);

        function calc(x, y) {
            let result = 35.74 + (0.6215 * x) - (35.75 * Math.pow(y, 0.16)) + (0.4275 * x * Math.pow(y, 0.16));
            return result.toFixed(0);
        }
        let finalResult = (t <= 50 && s > 3) ? `${f}°F` : 'N/A';
        document.getElementById('fh-windchill').textContent = finalResult;
    });

// -------------Soda Springs Forecast------------
const fishHavenRequestURLforecast = `https://api.openweathermap.org/data/2.5/forecast?id=${fishHavenCityID}&appid=${appid}&units=imperial`;

fetch(fishHavenRequestURLforecast)
    .then((response) => response.json())
    .then((jsonObject) => {
        // ----------------Declaring variables---------------
        const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        let daysArray = [];
        let iconsArray = [];
        let descIconArray = [];
        let tempArray = [];

        // --------------Setting up arrays----------------------
        for (let i = 0; i < jsonObject.list.length; i++) {
            if (jsonObject.list[i].dt_txt.indexOf('18:00:00') > -1) {
                let tempDay = new Date(jsonObject.list[i].dt_txt);
                daysArray.push(dayOfWeek[tempDay.getDay()]);
                iconsArray.push(jsonObject.list[i].weather[0].icon);
                descIconArray.push(jsonObject.list[i].weather[0].description)
                tempArray.push(jsonObject.list[i].main.temp);
            }
        }

        for (let i = 0; i < tempArray.length; i++) {
            // --------------Creating HTML elements--------------------
            let divCard = document.createElement('div');
            let dayP = document.createElement('p');
            let iconImg = document.createElement('img');
            let tempP = document.createElement('p');
            divCard.className = "forecast-day";
            dayP.setAttribute('id', `fh-dayOfWeek${i + 1}`);
            iconImg.setAttribute('id', `fh-icon${i + 1}`);
            tempP.setAttribute('id', `fh-temp${i + 1}`);
            divCard.appendChild(dayP);
            divCard.appendChild(iconImg);
            divCard.appendChild(tempP);
            document.getElementById("fh-forecast").appendChild(divCard);

            // ------------------Assigning values-----------------
            document.getElementById(`fh-dayOfWeek${i + 1}`).textContent = `${daysArray[i]}`;
            document.getElementById(`fh-icon${i + 1}`).setAttribute('src', `https://openweathermap.org/img/wn/${iconsArray[i]}@4x.png`);
            document.getElementById(`fh-icon${i + 1}`).setAttribute('alt', `${descIconArray[i]} icon`);
            document.getElementById(`fh-temp${i + 1}`).textContent = `${tempArray[i].toFixed(0)}°F`;
        }
    });

// ---------------Preston Events JSON Request-----------------------
const pEventsRequestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(pEventsRequestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == 'Preston') {
                let card = document.createElement('div');
                let h2 = document.createElement('h2');
                h2.textContent = "Upcoming Events";
                card.appendChild(h2);
                for (let j = 0; j < towns[i].events.length; j++) {
                    let events = document.createElement('p');
                    events.textContent = towns[i].events[j];
                    card.appendChild(events);
                }
                document.getElementById('preston-events').appendChild(card);
            }
        }
    })

// ---------------Soda Springs Events JSON Request-----------------------
const ssEventsRequestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(ssEventsRequestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == 'Soda Springs') {
                let card = document.createElement('div');
                let h2 = document.createElement('h2');
                h2.textContent = "Upcoming Events";
                card.appendChild(h2);
                for (let j = 0; j < towns[i].events.length; j++) {
                    let events = document.createElement('p');
                    events.textContent = towns[i].events[j];
                    card.appendChild(events);
                }
                document.getElementById('sodaSprings-events').appendChild(card);
            }
        }
    })

// ---------------Fish Haven Events JSON Request-----------------------
const fhEventsRequestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(fhEventsRequestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        const towns = jsonObject['towns'];
        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == 'Fish Haven') {
                let card = document.createElement('div');
                let h2 = document.createElement('h2');
                h2.textContent = "Upcoming Events";
                card.appendChild(h2);
                for (let j = 0; j < towns[i].events.length; j++) {
                    let events = document.createElement('p');
                    events.textContent = towns[i].events[j];
                    card.appendChild(events);
                }
                document.getElementById('fishHaven-events').appendChild(card);
            }
        }
    })