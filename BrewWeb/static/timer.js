/*TODO:
- play with the modulo end time thing in run()
- test
- change fields to HH and MM (no real need to set seconds)
- test
*/

var mn = document.getElementById('mn');
var sec = document.getElementById('sec');
var display = document.getElementById('timer');
var isRunning = false;

function setTimer() {
    if (mn.value || sec.value) {
        // the 450 adds a bump to ms and keeps the timer from skipping
        var remainingTime = (Math.abs(mn.value) * 60000) + (Math.abs(sec.value * 1000)) + 450;
        var resetTime = remainingTime;
        localStorage['remainingTime'] = remainingTime;
        localStorage['resetTime'] = resetTime;
        format(remainingTime);
    }
}

function run() {
    var endTime = Number(localStorage['endTime']);
    var remainingTime = endTime - Date.now();
    // since we lose about 1 ms each time through the loop
    // we correct by adding a little bit of time every so often
    if (remainingTime % 1000 <= 10) {
        // may get tricky with some modulo to make sure we
        // always get back to 450, not 449, etc
        endTime += 451; // actual amount may change
        localStorage['endTime'] = endTime;
    }
    localStorage['remainingTime'] = remainingTime;
    if (isRunning) {
        format(remainingTime);
    }
    if (remainingTime > 999) {
        timer = setTimeout(run, 1000);
    } else {
        // make 'remainingTime', and 'resetTime' falsey
        localStorage['remainingTime'] = '';
        localStorage['resetTime'] = '';
    }

}

function format(t) {
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

function start() {
    if (!isRunning && localStorage['remainingTime']) {
        isRunning = true;
        var remainingTime = Number(localStorage['remainingTime'])
        var endTime = Date.now() + remainingTime;
        localStorage['endTime'] = endTime;
        run();
    }
}

function stop() {
    isRunning = false;
    clearTimeout(timer);
}

function reset() {
    stop();
    var remainingTime = localStorage['resetTime'];
    localStorage['remainingTime'] = remainingTime;
    format(remainingTime);
}

start();
