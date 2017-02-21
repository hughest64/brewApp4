////////////tested!////////////////
function setTimer() {
   mn = Math.round(Math.abs(document.getElementById('mn').value));
   sec = Math.round(Math.abs(document.getElementById('sec').value));
   resetMn = mn;
   restSec = sec;
   t = format(mn, sec);
   display.innerHTML = t;

}
function format(m, s) {
   m = "0" + m
   s = "0" + s
   t = m.slice(-2) + ":" + s.slice(-2);
   return t;
}
///////////////////not tested!//////////////////////////////

function setTimer() {
    totalMn =  parseInt(Math.abs(mn.value));
    hr = Math.abs(totalMn/);
    mn = totalMn % 60;
    sec = parseInt(Math.abs(sec.value));
    format(hr, mn, sec);
}

function format(h, m, s) {
    h = "0" + h
    m = "0" + m
    s = "0" + s
    if (h=="00") {
        t = m.slice(-2) + ":" + s.slice(-2);
    } else {
        t = h.slice(-2) + ":" + m.slice(-2) + ":" + s.slice(-2);
    }
    return t;
}


///////////////////////////////////////////////////////////////////
var mn = document.getElementById('mn');
var sec = document.getElementById('sec');
var display = document.getElementById('timer');

function set() {
    m =  parseInt(Math.abs(mn.value));
    s =  parseInt(Math.abs(sec.value));
    display.innerHTML = "0" + m +":" + "0" + s;
}

// use the abs of min/60 to set hours and min % 60 to set the minutes
function format() {
    newHr = Math.abs(mn/60);
    newMn = mn % 60;

}
