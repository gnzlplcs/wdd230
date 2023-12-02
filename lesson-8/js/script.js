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