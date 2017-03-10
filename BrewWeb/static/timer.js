var hr = document.getElementById('hr')
var mn = document.getElementById('mn');
var sec = document.getElementById('sec');
var display = document.getElementById('timer');
var isRunning = false;


function setTimer() {
    // we only set the timer if there is some value to set
    if (hr.value || mn.value || sec.value) {
        // the 450 adds a bump to ms and keeps the timer from skipping
        var remainingTime = (
            (Math.abs(Math.floor(hr.value)) * 3600000) +
            (Math.abs(Math.floor(mn.value)) * 60000) +
            (Math.abs(Math.floor(sec.value * 1000))) + 450
        );
        var resetTime = remainingTime;
        localStorage['remainingTime'] = remainingTime;
        localStorage['resetTime'] = resetTime;
        formatDisplay(remainingTime);
    } else {
        console.log('this shit does not work')
    }
}

function runTimer() {
    if (isRunning) {
        var endTime = Number(localStorage['endTime']);
        var remainingTime = endTime - Date.now();
        // adding some buffer time to make sure we don't lose any time
        if (remainingTime % 1000 < 10) {
            endTime += 441;
            localStorage['endTime'] = endTime;
        }
        localStorage['remainingTime'] = remainingTime;
        formatDisplay(remainingTime);
        if (remainingTime > 999) {
            timer = setTimeout(runTimer, 1000);
        } else {
            // make values falsey
            isRunning = false;
            localStorage['remainingTime'] = '';
            localStorage['resetTime'] = '';
            // I think we add a check to see if there is a next step
            // if there is, we set the timer with that value
            // I think we need to json an array in local storage
        }
    }
}

function formatDisplay(t) {
    var h = Math.floor(t/3600000);
    var m = Math.floor(t/60000) % 60;
    var s = Math.floor(t/1000) % 60;

    var displayHr = "0" + h;
    var displayMn = "0" + m;
    var displaySec = "0" + s;

    if (h > 0) {
        display.innerHTML = displayHr.slice(-2) + ":" + displayMn.slice(-2) + ":" + displaySec.slice(-2);
    } else {
        display.innerHTML = displayMn.slice(-2) + ":" + displaySec.slice(-2);
    }
}

function startTimer() {
    if (!isRunning && localStorage['remainingTime']) {
        isRunning= true;
        var remainingTime = Number(localStorage['remainingTime'])
        var endTime = Date.now() + remainingTime;
        localStorage['endTime'] = endTime;
        runTimer();
    }
}

function stopTimer() {
    isRunning = false;
    clearTimeout(timer);
}

function resetTimer() {
    stopTimer();
    var remainingTime = localStorage['resetTime'];
    localStorage['remainingTime'] = remainingTime;
    formatDisplay(remainingTime);
}

function clearTimer() {
    stopTimer();
    isRunning = false;
    localStorage['remainingTime'] = '';
    localStorage['resetTime'] = '';
    localStorage['endTime'] = '';
    var display = document.getElementById('timer').innerHTML = '00:00';
}

startTimer();
