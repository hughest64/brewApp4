/*TODO:
- change fields to HH and MM (no real need to set seconds)
- test
*/

var mn = document.getElementById('mn');
var sec = document.getElementById('sec');
var display = document.getElementById('timer');
var isRunning = false;

var totalAdds = 0;

function setTimer() {
    // we only set the timer if there is some value to set
    if (mn.value || sec.value) {
        // the 450 adds a bump to ms and keeps the timer from skipping
        var remainingTime = (
            (Math.abs(mn.value) * 60000) + (Math.abs(sec.value * 1000)) + 30
        );
        var resetTime = remainingTime;
        localStorage['remainingTime'] = remainingTime;
        localStorage['resetTime'] = resetTime;
        format(remainingTime);
    }
}

function run() {
    if (isRunning) {
        var endTime = Number(localStorage['endTime']);
        var remainingTime = endTime - Date.now();
        // adding some buffer time to make sure we don't lose any time
        if (remainingTime % 1000 < 10) {
            endTime += 451;
            localStorage['endTime'] = endTime;
        }
        localStorage['remainingTime'] = remainingTime;
        format(remainingTime);
        if (remainingTime > 999) {
            timer = setTimeout(run, 1000);
        } else {
            isRunning = false;
            // make 'remainingTime', and 'resetTime' falsey
            localStorage['remainingTime'] = '';
            localStorage['resetTime'] = '';
            // tests remove later
            var dif = Number(OGend)
            var now = Date.now()
        }
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
        // just for a test, remove later
        OGend = endTime;
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
