var hr = document.getElementById('hr');
var mn = document.getElementById('mn');
var sec = document.getElementById('sec');
var display = document.getElementById('timer');
var current_step = document.getElementById('current_step');
// need to load some json arrays for mash/boil steps
var steps = JSON.parse(localStorage['steps']);


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
    }
}

function runTimer() {
    if (localStorage['isRunning']) {
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
            localStorage['isRunning'] = '';
            localStorage['remainingTime'] = '';
            localStorage['resetTime'] = '';
            nextTimer();
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
    if (!localStorage['isRunning'] && localStorage['remainingTime']) {
        localStorage['isRunning'] = 'true';
        var remainingTime = Number(localStorage['remainingTime'])
        var endTime = Date.now() + remainingTime;
        localStorage['endTime'] = endTime;
        runTimer();
    }
}

function stopTimer() {
    localStorage['isRunning'] = '';
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
    localStorage['remainingTime'] = '';
    localStorage['resetTime'] = '';
    localStorage['endTime'] = '';
    var display = document.getElementById('timer').innerHTML = '00:00';
}

function nextTimer() {
    stopTimer();
    var index = Number(localStorage['stepIndex']);
    if (localStorage['stepIndex'] && index < (steps.length - 1)) {
        index ++;
        current_step.innerHTML = steps[index][0];
        var time = Number(steps[index][1]) * 60000;
        localStorage['remainingTime'] = time;
        formatDisplay(time);
        localStorage['stepIndex'] = index;
    }
}

if (!localStorage['newTimer']) {
    if (localStorage['recipeLoaded']) {
        if (!localStorage['stepIndex']){
            localStorage['stepIndex'] = '0';
        }
        var index = Number(localStorage['stepIndex'])
        current_step.innerHTML = steps[index][0];
        var time = Number(steps[index][1]) * 60000;
        localStorage['remainingTime'] = time;
        formatDisplay(time);
        localStorage['recipeLoaded'] = '';

    } else {
        formatDisplay(localStorage['remainingTime']);
        runTimer();
    }

} else {
    localStorage['newTimer'] = '';
    formatDisplay(localStorage['remainingTime']);
}
