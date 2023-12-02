const date = new Date();
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let day1 = days[date.getDay()];
let day2 = days[date.getDay() + 1];
let day3 = days[date.getDay() + 2];
let day4 = days[date.getDay() + 3];
let day5 = days[date.getDay() + 4];
document.getElementById('day1').innerHTML = day1;
document.getElementById('day2').innerHTML = day2;
document.getElementById('day3').innerHTML = day3;
document.getElementById('day4').innerHTML = day4;
document.getElementById('day5').innerHTML = day5;

