var form = document.getElementById("form");
var outputDiv = document.getElementById("output");
var startCombatButton = document.getElementById("startCombat");
var nextTurnButton = document.getElementById("nextTurn");
var currentTurnDiv = document.getElementById("currentTurn");
var turnCountDiv = document.getElementById("turnCount");
var iniciativasArray = [];
var currentTurnIndex = null;
var turnCount = 0;
function updateOutput() {
    outputDiv.innerHTML = "";
    iniciativasArray.sort(function (a, b) { return b.iniciativa - a.iniciativa; });
    iniciativasArray.forEach(function (data, index) {
        var item = document.createElement("p");
        item.textContent = "".concat(index + 1, ". : ").concat(data.nomePersonagem, " - Iniciativa: ").concat(data.iniciativa);
        outputDiv.appendChild(item);
    });
    if (iniciativasArray.length > 0) {
        startCombatButton.style.display = "block";
    }
}
form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita o recarregamento da página
    var nomePersonagemInput = document.getElementById("name").value.trim();
    var iniciativaInput = parseInt(document.getElementById("iniciativa").value.trim());
    if (nomePersonagemInput && !isNaN(iniciativaInput)) {
        iniciativasArray.push({
            nomePersonagem: nomePersonagemInput,
            iniciativa: iniciativaInput,
        });
        outputDiv.style.display = "grid";
        updateOutput();
        form.reset();
    }
    else {
        // Exibe uma mensagem de erro se os campos forem inválidos
        alert("Por favor, preencha todos os campos corretamente.");
    }
});
startCombatButton.addEventListener('click', function () {
    if (iniciativasArray.length > 0) {
        currentTurnIndex = 0;
        startCombatButton.style.display = "none";
        nextTurnButton.style.display = "block";
        displayCurrentTurn();
    }
});
nextTurnButton.addEventListener("click", function () {
    if (currentTurnIndex !== null) {
        currentTurnIndex = (currentTurnIndex + 1) % iniciativasArray.length;
        if (currentTurnIndex === 0) {
            turnCount++;
            turnCountDiv.textContent = "Turnos completos: ".concat(turnCount);
        }
        displayCurrentTurn();
    }
});
function displayCurrentTurn() {
    if (currentTurnIndex !== null) {
        var currentPlayer = iniciativasArray[currentTurnIndex];
        currentTurnDiv.textContent = "\u00C9 a vez de: ".concat(currentPlayer.nomePersonagem, " (Iniciativa: ").concat(currentPlayer.iniciativa, ")");
    }
}
