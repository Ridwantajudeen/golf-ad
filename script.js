const ball = document.getElementById("ball");
const hole = document.getElementById("hole");
const powerFill = document.getElementById("power-fill");
const cta = document.getElementById("cta");

let isHolding = false;
let power = 0;
let maxPower = 100;
let interval = null;
let plays = 0;
const requiredPower = 50;
const maxPlays = 3;
const redirectUrl = "https://ridwantajudeen.vercel.app/";

const instruction = document.createElement("div");
instruction.id = "instruction";
instruction.innerText = "Press & hold Play Now to shoot!";
document.getElementById("game").appendChild(instruction);

cta.addEventListener("mousedown", startHold);
cta.addEventListener("touchstart", startHold);

window.addEventListener("mouseup", releaseShot);
window.addEventListener("touchend", releaseShot);

function startHold(e) {
  e.preventDefault();
  if (isHolding || plays >= maxPlays) return;
  isHolding = true;
  power = 0;
  interval = setInterval(() => {
    if (power < maxPower) {
      power++;
      powerFill.style.width = power + "%";
      if (power < 40) powerFill.style.background = "#21c55d";
      else if (power < 70) powerFill.style.background = "#facc15";
      else powerFill.style.background = "#ef4444";
    }
  }, 10);
}

function releaseShot() {
  if (!isHolding) return;
  isHolding = false;
  clearInterval(interval);
  animateBall(power);
  power = 0;
  powerFill.style.width = "0%";
}

function animateBall(currentPower) {
  const startTop = ball.offsetTop;
  const distance = (currentPower / maxPower) * 300;
  let current = startTop;

  const move = setInterval(() => {
    current -= 6;
    ball.style.top = current + "px";

    if (current <= hole.offsetTop + 20 && currentPower >= requiredPower) {
      clearInterval(move);
      showSuccess();
    }

    if (current < -50) {
      clearInterval(move);
      resetForNext();
    }
  }, 16);
}

function showSuccess() {
  plays++;
  cta.textContent = "Nice Shot!";
  cta.style.background = "#0ea5e9";
  instruction.innerText = "";

  if (plays >= maxPlays) {
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 800);
  } else {
    setTimeout(() => resetForNext(), 800);
  }
}

function resetForNext() {
  if (plays >= maxPlays) return;
  ball.style.top = "70%";
  cta.textContent = "Play Now";
  cta.style.background = "#1e8e3e";
  instruction.innerText = "Press & hold Play Now to shoot!";
}
