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
// Instruction overlay
const instruction = document.createElement("div");
instruction.id = "instruction";
instruction.innerText = "Hold the ball to play!";
instruction.style.position = "absolute";
instruction.style.top = "10%";
instruction.style.left = "50%";
instruction.style.transform = "translateX(-50%)";
instruction.style.color = "white";
instruction.style.fontSize = "20px";
instruction.style.fontWeight = "bold";
instruction.style.textShadow = "0 0 5px black";
document.getElementById("game").appendChild(instruction);

// Start holding
ball.addEventListener("touchstart", startHold);
ball.addEventListener("mousedown", startHold);

// Release to shoot
window.addEventListener("touchend", releaseShot);
window.addEventListener("mouseup", releaseShot);

// Play again
cta.addEventListener("click", playAgain);

function startHold() {
  if (isHolding) return;
  isHolding = true;
  power = 0;

  interval = setInterval(() => {
    if (power < maxPower) {
      power++;
      powerFill.style.width = power + "%";

      // Dynamic color feedback
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
  const targetTop = startTop - distance;
  let current = startTop;

  const move = setInterval(() => {
    current -= 6;
    ball.style.top = current + "px";

    // this is to check if the ball is in hole
    if (current <= hole.offsetTop + 20 && currentPower >= requiredPower) {
      clearInterval(move);
      showSuccess();
    }

    // this is to stop if ball goes out of screen
    if (current < -50) clearInterval(move);
  }, 16);
}

function showSuccess() {
  plays++;
  cta.textContent = "Nice Shot! Play Again";
  cta.style.background = "#0ea5e9";
  instruction.innerText = "";

  // to  redirect after max plays,
  if (plays >= maxPlays) {
    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 800);
  }
}

function playAgain() {
  if (plays >= maxPlays) return;

  // to reset ball position
  ball.style.top = "70%";
  cta.textContent = "Play Now";
  cta.style.background = "#1e8e3e";
  instruction.innerText = "Hold the ball to play!";
}
