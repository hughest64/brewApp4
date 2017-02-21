// load the script at the bottom of the body tag!

var hr = 0;
var mn = document.getElementById('mn');
var sec = document.getElementById('sec');
var resetHr = hr;
var resetMn = mn.value;
var resetSec = sec.value;
var display = document.getElementById('timer');
var isRunning = false;


function setTimer() {
    // ensure that the imer only runs wtih positive integers
    totalMn = Math.abs(parseInt(mn.value));
    hr = Math.abs(parseInt(totalMn/60));
    mn.value = totalMn % 60;
    // values that will become stings and displayed in the element
    displayHr = hr;
    displayMn = mn.value;
    displaySec = Math.abs(parseInt(sec.value));
    // storing values away for reseting the timer
    resetHr = displayHr;
    resetMn = mn.value;
    resetSec = sec.value;
    // displaying
    t = format(displayHr, displayMn, displaySec);
    display.innerHTML = t;
}

// decrements and displays timer values
function run() {
    if (isRunning) {
        // if the timer is not set, don't run it
        if (hr == 0 && mn.value == 0 && sec.value == 0) {
            stop();
        // if the hour place has some value
        } else if (hr > 0 && sec.value == 0) {
            // subtract hour and reset mn and sec
            if (mn.value == 0) {
                hr --;
                mn.value = 59;
                sec.value = 59;
            // or sub one from mn and reset sec
            } else {
                mn.value --;
                sec.value = 59;
            }
        // if we are under one hour to go
        } else if (sec.value == 0) {
            mn.value --;
            sec.value = 59;
        } else {
            sec.value --;
        }
        // create the display object value
        t = format(hr, mn.value, sec.value);
        display.innerHTML = t;
        // do the same thing again
        setTimeout(run, 1000);
    } 
}

// makes the display look how we want it to
function format(h, m, s) {
    displayHr = "0" + h;
    displayMn = "0" + m;
    displaySec = "0" + s;
    if (hr > 0) {
        t = displayHr.slice(-2) + ":" + displayMn.slice(-2) + ":" + displaySec.slice(-2);
    } else {
        t = displayMn.slice(-2) + ":" + displaySec.slice(-2);
    }
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
    hr = resetHr;
    mn.value = resetMn;
    sec.value = resetSec;
    t = format(hr, resetMn, resetSec);
    display.innerHTML = t;
}
