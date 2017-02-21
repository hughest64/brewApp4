// load the script at the bottom of the body tag!

var hr = 0
var mn = document.getElementById('mn');
var sec = document.getElementById('sec');
var resetHr = 0
var resetMn = mn.value
var resetSec = sec.value
var display = document.getElementById('timer');
var isRunning = false;


function setTimer() {
    displayMn = Math.abs(parseInt(mn.value));
    displaySec = Math.abs(parseInt(sec.value));
    resetMn = mn.value;
    resetSec = sec.value;
    t = format(displayMn, displaySec);
    display.innerHTML = t;
}

function run() {
    if (isRunning) {
        if (mn.value == 0 && sec.value == 0) {
            stop();
        } else if (sec.value == 0) {
            mn.value --;
            sec.value = 59;
        } else {
            sec.value --;
        }
        t = format(mn.value, sec.value);
        display.innerHTML = t;
        setTimeout(run, 1000);
    } else {
        stop();
    }
}
function format(m, s) {
    displayMn = "0" + m;
    displaySec = "0" + s;
    t = displayMn.slice(-2) + ":" + displaySec.slice(-2);
    return t;
}

function start() {
    if (isRunning  === false) {
       isRunning = true;
       setTimeout(run, 1000);
   }
}

function stop() {
    isRunning = false;
}

function reset() {
    isRunning = false;
    mn.value = resetMn;
    sec.value = resetSec;
    t = format(mn.value, sec.value);
    display.innerHTML = t;
}

function test() {
    alert(mn.value + ":" + sec.value);
}
