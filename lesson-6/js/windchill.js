let t = parseFloat(document.getElementById('temperature').innerHTML);
let s = parseFloat(document.getElementById('wind').innerHTML);
let f = calc(t, s);

function calc(x, y) {
    let result = 35.74 + (0.6215 * x) - (35.75 * Math.pow(y, 0.16)) + (0.4275 * x * Math.pow(y, 0.16));
    return result.toFixed(1);
}

let finalResult = (t <= 50 && s > 3) ? `${f}°F` : 'N/A';

document.getElementById('windchill').innerHTML = finalResult;