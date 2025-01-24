const form = document.getElementById("form") as HTMLFormElement;
const outputDiv = document.getElementById("output") as HTMLDivElement;
const startCombatButton = document.getElementById("startCombat") as HTMLButtonElement;
const nextTurnButton = document.getElementById("nextTurn") as HTMLButtonElement;
const currentTurnDiv = document.getElementById("currentTurn") as HTMLDivElement;
const turnCountDiv = document.getElementById("turnCount") as HTMLDivElement;

interface Data {
  nomePersonagem: string;
  iniciativa: number;
}

const iniciativasArray: Data[] = [];
let currentTurnIndex: number | null = null;
let turnCount: number = 0

function updateOutput() {
  outputDiv.innerHTML = "";

  iniciativasArray.sort((a, b) => b.iniciativa - a.iniciativa);

  iniciativasArray.forEach((data, index) => {
    const item = document.createElement("p");
    item.textContent = `${index + 1}. : ${
      data.nomePersonagem
    } - Iniciativa: ${data.iniciativa}`;
    outputDiv.appendChild(item);
  });

  if (iniciativasArray.length > 0) {
    startCombatButton.style.display = "block";
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Evita o recarregamento da página

  const nomePersonagemInput = (
    document.getElementById("name") as HTMLInputElement
  ).value.trim();
  const iniciativaInput = parseInt(
    (document.getElementById("iniciativa") as HTMLInputElement).value.trim()
  );

  if (nomePersonagemInput && !isNaN(iniciativaInput)) {
    iniciativasArray.push({
      nomePersonagem: nomePersonagemInput,
      iniciativa: iniciativaInput,
    });
    outputDiv.style.display = "grid";
    updateOutput();

    form.reset();
  } else {
    // Exibe uma mensagem de erro se os campos forem inválidos
    alert("Por favor, preencha todos os campos corretamente.");
  }
});

startCombatButton.addEventListener('click', ()=> {
  if(iniciativasArray.length > 0) {
    currentTurnIndex = 0
    startCombatButton.style.display = "none"
    nextTurnButton.style.display = "block"
    displayCurrentTurn()
  }
})

nextTurnButton.addEventListener(`click`, () => {
  if (currentTurnIndex !== null) {
    currentTurnIndex = (currentTurnIndex + 1) % iniciativasArray.length

    if (currentTurnIndex === 0) {
      turnCount++
      turnCountDiv.textContent = `Turnos completos: ${turnCount}`
    }
    displayCurrentTurn()
  }
})
function displayCurrentTurn() {
  if (currentTurnIndex !== null) {
    const currentPlayer = iniciativasArray[currentTurnIndex]
      currentTurnDiv.textContent = `É a vez de: ${currentPlayer.nomePersonagem} (Iniciativa: ${currentPlayer.iniciativa})`;
  }
}

