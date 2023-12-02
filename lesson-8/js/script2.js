let myData = new Date(document.lastModified);
let minimalDate = `${myData.getMonth()+1}.${myData.getDate()}.${myData.getFullYear()}`;
document.getElementById('lastMinimalUpdate').innerHTML = minimalDate;