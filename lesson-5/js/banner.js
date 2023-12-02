const completeDate = new Date();
let today = completeDate.getDay();
let element = document.getElementById('friday-banner');
if (today == 5) {
    element.style.display = "block";
}