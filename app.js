var second = 0;
var minute = 0;
var hour = 0;

var lapCounter = 0;

var clock;

var timer = document.getElementById("timer");
var startBtn = document.getElementById("start");
var stopBtn = document.getElementById("stop");
var resetBtn = document.getElementById("reset");
var lapBtn = document.getElementById("lap");

var lapRecord = document.getElementById("lap-record");

function clockHandler() {
  console.log(`${++second} second${second == 1 ? "" : "s"} elapsed.`);

  if (second > 59) {
    second = 0;
    minute++;
  }
  if (minute > 59) {
    minute = 0;
    hour++;
  }
  //console.log(`${hour} : ${minute} : ${second}`);

  displayTime();
}

function displayTime() {
  timer.innerText = prettyTime(hour, minute, second);
}

function prettyTime(hour = 0, minute = 0, second = 0) {
  var hours, minutes, seconds; // strings
  hours = minutes = seconds = "";

  seconds = second < 10 ? `0${second}` : `${second}`;
  minutes = minute < 10 ? `0${minute}` : `${minute}`;
  hours = hour < 10 ? `0${hour}` : `${hour}`;
  return `${hours} : ${minutes} : ${seconds}`;
}

// Buttons

// start
startBtn.addEventListener("click", function() {
  clock = setInterval(clockHandler, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
  console.log("Timer started.");
});

// stop
stopBtn.addEventListener("click", function() {
  clock = clearInterval(clock);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = false;
  lapBtn.disabled = false;
  console.log("Timer stopped.");
});

// reset
resetBtn.addEventListener("click", function() {
  clock = clearInterval(clock);

  second = minute = hour = 0;
  lapCounter = 0;
  timer.innerText = prettyTime();

  startBtn.disabled = false;
  stopBtn.disabled = true;
  resetBtn.disabled = false;
  lapBtn.disabled = true;
  console.log("Timer reset. Laps cleared");

  lapRecord.innerHTML = "";
});

// lap
lapBtn.addEventListener("click", function() {
  var lapListItem = document.createElement("P");
  lapCounter++;
  lapListItem.innerText = `${lapCounter}. ${prettyTime(hour, minute, second)}`;
  lapRecord.append(lapListItem);

  console.log(`Lap #${lapCounter} recorded at ${lapListItem.innerText}`);
});
