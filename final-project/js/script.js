// ----------------Font --------------------
WebFont.load({
    google: {
        families: ['Bangers', 'Cabin Condensed', 'Crimson Pro']
    }
});

// ----------------Toggle Nav--------------
function toggle() {
    document.getElementById('nav-menu').classList.toggle('hide');
}

// -------------Last Modification------------
const lastModDate = new Date(document.lastModified);
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const writtenMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
document.getElementById('last-modification').innerHTML = `Last update: ${dayOfWeek[lastModDate.getDay()]}, ${writtenMonth[lastModDate.getMonth()]} ${lastModDate.getDate()} ${lastModDate.getFullYear()}`;

// ******************************************************
// -----------Directory API Manipulation-----------------
const upcEvURL = 'https://gnzlplcs.github.io/final-project/js/directory.json';

// -------------Business Cards Homepage---------------
fetch(upcEvURL)
    .then(response => response.json())
    .then(jsonObject => {
        let business = jsonObject.local_business;
        for (let i = 0; i < 3; i++) {
            let businessCard = document.createElement('section');
            let localName = document.createElement('h3');
            let localDesc = document.createElement('div');
            let localAddress = document.createElement('div');
            let localContact = document.createElement('div');
            let contactLink = document.createElement('a');
            let localSite = document.createElement('div');
            let siteLink = document.createElement('a');
            localName.textContent = business[i].name;
            localDesc.textContent = business[i].description;
            localAddress.textContent = `${business[i].address.number} ${business[i].address.street}, ${business[i].address.district}`;
            contactLink.setAttribute('href', `tel:+${business[i].contact.phone}`);
            contactLink.textContent = `Call: ${business[i].contact.phone}`;
            localContact.appendChild(contactLink);
            siteLink.setAttribute('href', `${business[i].url}`);
            siteLink.setAttribute('target', '_blank');
            siteLink.setAttribute('rel', 'noreferrer');
            siteLink.textContent = 'Visit Site';
            localSite.appendChild(siteLink);
            businessCard.appendChild(localName);
            businessCard.appendChild(localDesc);
            businessCard.appendChild(localAddress);
            businessCard.appendChild(localContact);
            businessCard.appendChild(localSite);
            document.querySelector('div.cards-locals').appendChild(businessCard);
        };
    })

// -------------Business Cards Directory---------------
fetch(upcEvURL)
    .then(response => response.json())
    .then(jsonObject => {
        let business = jsonObject.local_business;
        business.forEach(local => {
            let businessCard = document.createElement('section');
            let infoDiv = document.createElement('div');
            let imgDiv = document.createElement('div');
            let localName = document.createElement('h3');
            let localDesc = document.createElement('div');
            let localAddress = document.createElement('div');
            let localContact = document.createElement('div');
            let contactLink = document.createElement('a');
            let localSite = document.createElement('div');
            let siteLink = document.createElement('a');
            let localImg = document.createElement('img');
            localName.textContent = local.name;
            localDesc.textContent = local.description;
            localAddress.textContent = `${local.address.number} ${local.address.street}, ${local.address.district}`;
            contactLink.setAttribute('href', `tel:+${local.contact.phone}`);
            contactLink.textContent = `Call: ${local.contact.phone}`;
            localContact.appendChild(contactLink);
            siteLink.setAttribute('href', `${local.url}`);
            siteLink.setAttribute('target', '_blank');
            siteLink.setAttribute('rel', 'noreferrer');
            siteLink.textContent = 'Visit Site';
            localSite.appendChild(siteLink);
            localImg.setAttribute('src', `assets/${local.image}`);
            localImg.setAttribute('alt', `${local.name} image`);
            localImg.setAttribute('width', '480');
            localImg.setAttribute('loading', 'lazy');
            infoDiv.appendChild(localName);
            infoDiv.appendChild(localDesc);
            infoDiv.appendChild(localAddress);
            infoDiv.appendChild(localContact);
            infoDiv.appendChild(localSite);
            imgDiv.appendChild(localImg);
            businessCard.appendChild(infoDiv);
            businessCard.appendChild(imgDiv);
            document.querySelector('div.cards-locals-dir').appendChild(businessCard);
        });
    });

// ----------Upcoming Events---------------
fetch(upcEvURL)
    .then(response => response.json())
    .then(jsonObject => {
        let events = jsonObject.events;
        events.forEach(cityEvent => {
            let upcEvCard = document.createElement('section');
            let textContainer = document.createElement('div');
            let imgContainer = document.createElement('div');
            let upcEvTitle = document.createElement('h3');
            let upcEvDate = document.createElement('div');
            let upcEvPlace = document.createElement('div');
            let upcEvImg = document.createElement('img');
            upcEvTitle.textContent = cityEvent.name;
            upcEvDate.textContent = `When: ${cityEvent.date}`;
            upcEvPlace.textContent = `Where: ${cityEvent.place}`;
            upcEvImg.setAttribute('src', `assets/${cityEvent.image}`);
            upcEvImg.setAttribute('alt', `${cityEvent.name} Image`);
            upcEvImg.setAttribute('width', '760');
            upcEvImg.setAttribute('loading', 'lazy');
            textContainer.appendChild(upcEvTitle);
            textContainer.appendChild(upcEvDate);
            textContainer.appendChild(upcEvPlace);
            imgContainer.appendChild(upcEvImg);
            upcEvCard.appendChild(textContainer);
            upcEvCard.appendChild(imgContainer);
            document.querySelector('div.upcoming-events').appendChild(upcEvCard);
        });
    });

// *********************************************
// ---------Weather API Manipulation------------
const lat = -12.04318;
const lon = -77.02824;
const apiKey = "96903c0c4a665e1829d511ed75451893";
const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`;

fetch(requestURL)
    .then(response => response.json())
    .then((jsonObject) => {

        // --------Weather JSON--------------
        let weatherCard = document.createElement('section');
        let weatherTitle = document.createElement('h3');
        let iconImg = document.createElement('img')
        let tempDiv = document.createElement('div');
        let descDiv = document.createElement('div');
        let humDiv = document.createElement('div');
        weatherTitle.textContent = "Current Weather";
        iconImg.setAttribute('src', `https://openweathermap.org/img/wn/${jsonObject.current.weather[0].icon}@4x.png`);
        iconImg.setAttribute('alt', `${jsonObject.current.weather[0].main} icon`)
        tempDiv.textContent = `Temperature: ${jsonObject.current.temp.toFixed(0)}°C`;
        descDiv.textContent = `Condition: ${jsonObject.current.weather[0].main}`;
        humDiv.textContent = `Humidity: ${jsonObject.current.humidity}%`;
        weatherCard.appendChild(weatherTitle);
        weatherCard.appendChild(iconImg);
        weatherCard.appendChild(tempDiv);
        weatherCard.appendChild(descDiv);
        weatherCard.appendChild(humDiv);

        // --------------Forecast JSON--------------
        let forecastCard = document.createElement('section');
        forecastCard.className = 'forecastCard';
        let forecastTitle = document.createElement('h3');
        forecastTitle.textContent = '3-day Forecast';
        forecastCard.appendChild(forecastTitle);
        for (let i = 0; i < 3; i++) {
            let forecastDay = document.createElement('div');
            forecastDay.setAttribute('id', `day${i+1}`);
            let dayLabel = document.createElement('div');
            let condIcon = document.createElement('img');
            let tempDay = document.createElement('div');
            let currentDay = new Date(jsonObject.daily[i + 1].dt * 1000);
            dayLabel.textContent = dayOfWeek[currentDay.getDay()];
            condIcon.setAttribute('src', `https://openweathermap.org/img/wn/${jsonObject.daily[i].weather[0].icon}@4x.png`);
            condIcon.setAttribute('alt', `${jsonObject.daily[i].weather[0].main} icon`);
            tempDay.textContent = `${jsonObject.daily[i].temp.day.toFixed(0)}°C | ${jsonObject.daily[i].weather[0].main}`;
            forecastDay.appendChild(dayLabel);
            forecastDay.appendChild(condIcon);
            forecastDay.appendChild(tempDay);
            forecastCard.appendChild(forecastDay);
        };
        document.querySelector('div.weather').appendChild(weatherCard);
        document.querySelector('div.weather').appendChild(forecastCard);
    });

// -------------Board directors JSON----------------
fetch(upcEvURL)
    .then(response => response.json())
    .then(jsonObject => {
        let dirElement = jsonObject.directors;
        dirElement.forEach(director => {
            let dirSection = document.createElement('section');
            let dirName = document.createElement('h3');
            let dirPosition = document.createElement('div');
            let dirProfImg = document.createElement('img');
            let dirContact = document.createElement('div');
            dirName.textContent = director.name;
            dirPosition.textContent = director.position;
            dirProfImg.setAttribute('src', `assets/${director.image}`);
            dirProfImg.setAttribute('alt', `${director.position}`);
            dirProfImg.setAttribute('width', '540');
            dirSection.appendChild(dirName);
            dirSection.appendChild(dirPosition);
            dirSection.appendChild(dirProfImg);
            document.querySelector('div.board-directors').appendChild(dirSection);
        })
    })

// -------------------Gallery-------------

    fetch(upcEvURL)
    .then(response => response.json())
    .then(jsonObject => {
        let dirElement = jsonObject.gallery;
        dirElement.forEach(image => {
            let dirSection = document.createElement('section');
            let imgFigure = document.createElement('figure');
            let galImage = document.createElement('img');
            let imgCaption = document.createElement('figcaption');
            galImage.setAttribute('src', `assets/${image.image}`);
            galImage.setAttribute('alt', `${image.title} image`);
            galImage.setAttribute('width', '540');
            galImage.setAttribute('loading', 'lazy');
            imgCaption.textContent = image.title;
            imgFigure.appendChild(galImage);
            imgFigure.appendChild(imgCaption);
            dirSection.appendChild(imgFigure);
            document.querySelector('div.gallery').appendChild(dirSection);
        })
    })

// // ------------Intersection observer---------------
// const images = document.querySelectorAll('img');
// const config = {
//     rootMargin: '0px 0px 50px 0px',
//     threshold: 0
// };
// let loaded = 0;

// let observer = new IntersectionObserver(function (entries, self) {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             // console.log(`Image ${entry.target.src} is in the viewport!`);
//             preloadImage(entry.target);
//             // Stop watching and load the image
//             self.unobserve(entry.target);
//         }
//     });
// }, config);

// images.forEach(image => {
//     observer.observe(image);
// })