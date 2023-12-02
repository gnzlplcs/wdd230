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

// ---------------JSON Request-----------------------
const requestURL = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(requestURL)
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
                document.querySelector('div.cards').appendChild(card);
            }

        }
    })