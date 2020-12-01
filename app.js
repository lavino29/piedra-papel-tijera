const scissors = document.querySelector("#scissors");
const paper = document.querySelector("#paper");
const rock = document.querySelector("#rock");
const contadorSeg = document.querySelector("#conteo");
const playing = document.querySelector("#playing");
const play = document.querySelector("#play");
const round = document.querySelector("#round");
const rock_adversary = document.querySelector("#rock-adversary");
const rock_player = document.querySelector("#rock");
const close = document.querySelector(".close");
const modal = document.querySelector("#modal_container");
const modal2 = document.querySelector("#modal");
const result = document.querySelector(".result");
const result_player = document.querySelector("#result_player");
const result_adversary = document.querySelector("#result_adversary");

let counter = 4;
let movePlayer = "";
let finish = true;
let winers = {
  1: 0,
  2: 0,
};

let round_counter = {
  round: 0,
  rondas: 1,
};

const move = {
  1: "scissors",
  2: "paper",
  3: "rock",
};

round.addEventListener("change", (e) => {
  round_counter.rondas = parseInt(e.target.value);
  round_counter.round = 0;
  winers[1] = 0;
  winer[2] = 0;
});

const round_logica = (win) => {
  if (round_counter.rondas == 1 && round_counter.round == 1) {
    if (winers[1] >= 1) {
      winer("PLAYER");
    }
    if (winers[2] >= 1) {
      winer("ADVERSARY");
    }
  }
  if (round_counter.round <= 3 || round_counter.rondas == 3) {
    if (winers[1] >= 2) {
      winer("PLAYER");
    }
    if (winers[2] >= 2) {
      winer("ADVERSARY");
    }

    if (round_counter.round <= 5 || round_counter.rondas == 5) {
      if (winers[1] >= 3) {
        winer("PLAYER");

        //  round_counter.round = 0;
      }
      if (winers[2] >= 3) {
        winer("ADVERSARY");
      }
    }
  }
  round_counter.round = 0;
  winers[1] = 0;
  winers[2] = 0;
};

// MODAL CLASE

close.addEventListener("click", () => {
  modal.classList.add("close_active");
  modal2.classList.add("modal_active");
  result_adversary.textContent = `${winers[2]}`;
  result_player.textContent = `${winers[1]}`;
});
const winer = (win, player, enemy) => {
  console.log(win, player, enemy);
  finish = true;
  modal.classList.add("modal_container");
  modal.classList.remove("close_active");
  modal2.classList.remove("modal_active");
  modal2.classList.add("modal");
  if (player == undefined) {
    result.textContent = `EL GANADOR ES: '${win}'`;
  } else if ((win && player && enemy) != undefined) {
    result.textContent = `Ganador: ${win} -- round: ${round_counter.round} --
    resultados: Player ${player} - PC ${enemy}`;
  }
};

// LOGICA DE LA CUENTA REGRESIVA BLOQUEA LA JUGADA HASTA QUE SE TERMINE EL TIEMPO Y SE DETERMINE EL GANADOR
const segRegresivo = (value) => {
  return new Promise((resolve, reject) => {
    const stop = (parameter) => {
      if (parameter == 0) {
        clearInterval(interval);
        counter = 4;
        resolve({ play: true });
      }
    };

    const interval = setInterval(() => {
      counter--;
      contadorSeg.textContent = `${counter}`;
      if (counter === 0) {
        contadorSeg.textContent = "GO";
      }
      stop(counter);
    }, 1000);
  });
};

// NUMERO RAMDON DEL 1 AL 3 QUE DETERMINA LA JUGADA DEL ADVERSARIO
const ramdon = () => {
  const number = Math.round(Math.random() * (1 - 3) + 3);
  return number;
};
// LOGICA DEL MOVIMIENTO ENEMIGO
const selectEnemy = (result) => {
  //SELECCIONAR LOS NODOS PARA CREAR UN BUCLE Y AGREGAR Y QUITAR LA CLASE, 'SOMBREADO DE LAS JUGADAS'
  const nodo = [...rock_adversary.parentElement.children];
  nodo.forEach((element) => {
    if (element.classList == "select") {
      element.classList.remove("select");
    }
    if (element.id == "rock-adversary" && result == "rock") {
      element.classList.add("select");
    }
    if (element.id == "scissors-adversary" && result == "scissors") {
      element.classList.add("select");
    }
    if (element.id == "paper-adversary" && result == "paper") {
      element.classList.add("select");
    }
  });
};
// MOVIMIENTO ENEMIGO
const enemyPC = (opcion) => {
  const result = move[opcion];
  selectEnemy(result);

  return result;
};

const restart = () => {
  const nodo = [...rock_adversary.parentElement.children];

  nodo.forEach((element) => {
    if (element.classList == "select") {
      element.classList.remove("select");
    }
  });
  const nodo_ = [...rock_player.parentElement.children];

  nodo_.forEach((element) => {
    if (element.classList == "select") {
      element.classList.remove("select");
    }
  });
};
// CONTROL DE MOVIMIENTOS

const brain = (parameter, enemy) => {
  const enemyMove = enemyPC(enemy);

  if (round_counter.round < round_counter.rondas) {
    round_counter.round = 1 + round_counter.round;
    if (parameter === enemyMove) {
      setTimeout(() => {
        restart();
        winers[1]++;
        winers[2]++;
        if (round_counter.round == round_counter.rondas) {
          round_logica();
        }
        if (winers[1] == 2 || winers[2] == 2) {
          round_logica();
        } else if (round_counter.round < round_counter.rondas) {
          winer("empate", winers[1], winers[2]);
        }
      }, 2000);
    }
    if (parameter != enemyMove) {
      if (parameter == move[1] && enemyMove == move[2]) {
        console.log("player win");
        setTimeout(() => {
          restart();

          winers[1]++;
          if (round_counter.round == round_counter.rondas) {
            round_logica();
          } else if (round_counter.round < round_counter.rondas) {
            if (winers[1] == 2 || winers[2] == 2) {
              round_logica();
            } else {
              winer("player win", winers[1], winers[2]);
            }
          }
        }, 2000);
      }
      if (parameter == move[3] && enemyMove == move[2]) {
        console.log("");
        //  setTimeout( restart(),3000)
        setTimeout(() => {
          restart();

          winers[2]++;
          if (round_counter.round == round_counter.rondas) {
            round_logica();
          } else if (round_counter.round < round_counter.rondas) {
            if (winers[1] == 2 || winers[2] == 2) {
              round_logica();
            } else {
              winer("adversary win", winers[1], winers[2]);
            }
          }
        }, 2000);
      }
      if (parameter == move[2] && enemyMove == move[3]) {
        console.log("player win");
        // setTimeout( restart(),3000)
        setTimeout(() => {
          restart();
          winers[1]++;
          if (round_counter.round == round_counter.rondas) {
            round_logica();
          } else if (round_counter.round < round_counter.rondas) {
            if (winers[1] == 2 || winers[2] == 2) {
              round_logica();
            } else {
              winer("player win", winers[1], winers[2]);
            }
          }
        }, 2000);
      }
      if (parameter == move[2] && enemyMove == move[1]) {
        console.log("ardversary win");
        //  setTimeout( restart(),3000)
        setTimeout(() => {
          restart();
          winers[2]++;
          if (round_counter.round == round_counter.rondas) {
            round_logica();
          } else if (round_counter.round < round_counter.rondas) {
            if (winers[1] == 2 || winers[2] == 2) {
              round_logica();
            } else {
              winer("adversary win", winers[1], winers[2]);
            }
          }
        }, 2000);
      }
      if (parameter == move[3] && enemyMove == move[1]) {
        console.log("player win ");
        //  setTimeout( restart(),3000)
        setTimeout(() => {
          restart();
          winers[1]++;
          if (round_counter.round == round_counter.rondas) {
            round_logica();
          } else if (round_counter.round < round_counter.rondas) {
            if (winers[1] == 2 || winers[2] == 2) {
              round_logica();
            } else {
              winer("player win", winers[1], winers[2]);
            }
          }
        }, 2000);
      }
      if (parameter == move[1] && enemyMove == move[3]) {
        console.log("adversary win");
        setTimeout(() => {
          restart();
          winers[2]++;
          if (round_counter.round == round_counter.rondas) {
            round_logica();
          } else if (round_counter.round < round_counter.rondas) {
            if (winers[1] == 2 || winers[2] == 2) {
              round_logica();
            } else {
              winer("adversary win", winers[1], winers[2]);
            }
          }
        }, 2000);
      }
    }
  }
};

// player selection
playing.addEventListener("click", (e) => {
  const nodo = [...e.target.parentElement.children];
  e.target.parentElement.classList.remove("select");
  nodo.forEach((element) => {
    if (element.classList == "select") {
      element.classList.remove("select");
    }
  });
  if (e.target.id != "playing") {
    e.target.classList.add("select");
  }

  movePlayer = e.target.id;
});

// BUTTON PLAY
play.addEventListener("click", async (e) => {
  if (finish == true) {
    finish = false;
    const result = await segRegresivo();
    if (result.play) {
      brain(movePlayer, ramdon());
    }
  }
});


