// Date for the footer
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let lastModifiedDate = new Date(document.lastModified);
let result = `${weekdays[lastModifiedDate.getDay()]}, ${lastModifiedDate.getDate()} ${months[lastModifiedDate.getMonth()]} ${lastModifiedDate.getFullYear()}`;
document.getElementById('lastUpdate').innerHTML = result;


// Toggle nav 
function toggle() {
    document.getElementById('nav-menu').classList.toggle('hide');
}

// Friday banner
const currentDate = new Date();
let today = currentDate.getDay();
let element = document.getElementById('friday-banner');
if (today == 5) {
    element.style.display = "block";
}

// Five days forecast
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let day1 = days[currentDate.getDay()];
let day2 = days[currentDate.getDay() + 1];
let day3 = days[currentDate.getDay() + 2];
let day4 = days[currentDate.getDay() + 3];
let day5 = days[currentDate.getDay() + 4];
document.getElementById('day1').innerHTML = day1;
document.getElementById('day2').innerHTML = day2;
document.getElementById('day3').innerHTML = day3;
document.getElementById('day4').innerHTML = day4;
document.getElementById('day5').innerHTML = day5;

// Font 
WebFont.load({
    google: {
      families: ['Work Sans', 'Neuton', 'Asul']
    }
  });