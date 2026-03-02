let focusTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = focusTime;
let isRunning = false;
let isFocus = true;
let timer;

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").innerText =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;
            switchMode();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isFocus = true;
    timeLeft = focusTime;
    document.getElementById("status").innerText = "Focus Time";
    updateDisplay();
}

function switchMode() {
    if (isFocus) {
        isFocus = false;
        timeLeft = breakTime;
        document.getElementById("status").innerText = "Break Time";
        alert("Focus session completed! Take a break.");
    } else {
        isFocus = true;
        timeLeft = focusTime;
        document.getElementById("status").innerText = "Focus Time";
        alert("Break over! Back to study.");
    }
    updateDisplay();
    startTimer();
}

/* ========================= */
/* Background Change Feature */
/* ========================= */

function openBgChooser() {
    document.getElementById("bgInput").click();
}

document.getElementById("bgInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
        }
        reader.readAsDataURL(file);
    }
});

/* ========================= */
/* Notes Toggle + Upload    */
/* ========================= */

function toggleNotes() {
    function toggleNotes() {
    document.getElementById("notesPage").classList.toggle("active");
    }}

document.getElementById("noteFile").addEventListener("change", function(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("filePreview");

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
});

updateDisplay();