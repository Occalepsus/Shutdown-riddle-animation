const screen = document.getElementsByClassName("screen")[0];

const buttons = document.getElementsByClassName("button");

const attempts = document.getElementById("attempts");

let fail = false;
let idx = 0;

document.addEventListener("keyup", (e) => {
  console.log(e.key + " was pressed");
  if (e.key === "1" || e.key === "&") {
    testButton(buttons[0]);
  }
  if (e.key === "2" || e.key === "é") {
    testButton(buttons[1]);
  }
  if (e.key === "3" || e.key === "\"") {
    testButton(buttons[2]);
  }
  if (e.key === "4" || e.key === "'") {
    testButton(buttons[3]);
  }
})

// Array.prototype.forEach.call(buttons, (button) => {
//   button.addEventListener("click", () => {
//     console.log("clicked on ", button.id);
//     testButton(button);
//   });
// });

const error = () => {
  fail = false;
  idx = 0;
  [].forEach.call(buttons, (button) => {
    button.classList.remove("active");
    button.classList.remove("selected");
  });
  screen.classList.add("error");
  setTimeout(() => {
    screen.classList.remove("error");

    setTimeout(() => {
      screen.classList.add("error");
      setTimeout(() => {
        screen.classList.remove("error");
        setTimeout(() => {
          newAttempt();
        }, 1000);
      }, 150);
    }, 100);
  }, 150);
};

const testButton = (button) => {
  if (button.classList.contains("active")) {
    button.classList.remove("active");
    button.classList.add("selected");
    idx++;
  } else {
    fail = true;
  }
};

const newAttempt = () => {
  if (attempts.innerHTML === "1") {
    let blackOut = document.createElement("div");
    blackOut.id = "black-out";
    document.body.appendChild(blackOut);
  }
  // Si il reste des essais,
  else {
    // On crée un ordre
    let order = [-1, -1, -1, -1];

    for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * 4);
      while (order[random] !== -1) {
        random = Math.floor(Math.random() * 4);
      }
      order[random] = i;
    }

    console.log(order);

    // On commence le jeu.

    let a = idx;
    let button = buttons[order[a]];
    button.classList.add("active");

    const timer = setInterval(() => {
      // Si on a fait une erreur
      if (fail) {
        error();
        attempts.innerHTML = parseInt(attempts.innerHTML) - 1;
        clearInterval(timer);
        return;
      }
      // Si on passe à l'étape suivante
      else if (a !== idx) {
        // Si on a gagné
        if (idx === 4) {
          clearInterval(timer);
          let counter = document.createElement("div");

          let counterText = document.createElement("p");
          counterText.innerText = "\nShutdown in ";
          
          let counterSpan = document.createElement("span");
          counterSpan.className = "counter";
          c = 10;
          counterSpan.innerText = c;
          endTimer = setInterval(() => {
            counterSpan.innerText = --c;
            if (c == 0) {
              shutdownText = document.createElement("p");
              shutdownText.className = "line-jump";
              shutdownText.innerText = "intelli_bird shutdown..."
              counter.appendChild(shutdownText);
            }
            if (c < 0) {
              won = document.createElement("div");
              won.id = "won";
              document.body.appendChild(won);
              clearInterval(endTimer);
            }
          }, 1400);

          counterText.appendChild(counterSpan);
          counter.appendChild(counterText);
          document.getElementById("screen").appendChild(counter);
        }
        // Sinon on continue
        else {
          a++;
          button = buttons[order[a]];
          button.classList.add("active");
          console.log(order[a]);
        }
      }
    }, 100);
  }
  console.log(attempts.innerHTML);
};

newAttempt();
