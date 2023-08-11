const dateElement = document.querySelector('.date');

function updateDate() {
  const currentDate = new Date();

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  dateElement.textContent = formattedDate;
}

// Appeler la fonction une fois immédiatement
updateDate();

// Mettre à jour la date toutes les secondes
setInterval(updateDate, 1000);

setInterval(updateDate, 1000);

const timerElement = document.querySelector('.timer');

function calculateRemainingTime() {
  const birthDate = new Date(1996, 2, 20);
  const currentDate = new Date();
  const futureDate = new Date(birthDate.getFullYear() + 80, 2, 20);

  const remainingMilliseconds = futureDate - currentDate;
  const remainingSeconds = Math.floor(remainingMilliseconds / 1000);

  const formattedRemainingSeconds = formatNumberWithSpaces(remainingSeconds);
  timerElement.textContent = formattedRemainingSeconds;
}

function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

calculateRemainingTime();
setInterval(calculateRemainingTime, 1000);

//------------------------------------------------------
function calculerIMC() {
  const poidsInput = document.getElementById(".poids").value;
  const tailleInput = document.getElementById(".taille").value;

  const poids = parseFloat(poidsInput);
  const taille = parseFloat(tailleInput);

  if (isNaN(poids) || isNaN(taille) || poids <= 0 || taille <= 0) {
    document.getElementById("resultat").textContent = "Entrez des valeurs valides pour le poids et la taille.";
    return;
  }

  // Convertir la taille en mètres si elle est en centimètres
  if (taille > 10) {
    taille /= 100;
  }

  const imc = poids / (taille * taille);
  document.getElementById(".imc").textContent = "Votre IMC est : " + imc.toFixed(2);
}

//---------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Sélection des éléments d'entrée
  const ageInput = document.querySelector(".agenumber");
  const tailleInput = document.querySelector(".taille");
  const poidsInput = document.querySelector(".poids");
  const IMC = document.querySelector('.IMC')

  const nomInput = document.querySelector(".nickname");
  const expInput = document.querySelector(".experience");
  const argInput = document.querySelector(".argent");

  // Chargement des valeurs depuis le local storage, s'il y en a
  let savedValues = JSON.parse(localStorage.getItem('inputValues')) || {};

  // Fonction pour afficher les valeurs dans les éléments <p>
  function displayValues(inputValues) {
    if (ageInput) { ageInput.value = inputValues.age || ''; }
    if (tailleInput) { tailleInput.value = inputValues.taille || ''; }
    if (poidsInput) { poidsInput.value = inputValues.poids || ''; }
    IMC.innerText = 'Ton IMC est de : '+(poidsInput.value/((tailleInput.value/100)*(tailleInput.value/100))).toFixed(1);

    if (nomInput) {nomInput.value = inputValues.nom || '';}
    if (expInput) {expInput.value = inputValues.exp || '';}
    if (argInput) {argInput.value = inputValues.arg || '';}
  }

  // Si des valeurs ont été sauvegardées, les afficher dans les champs d'entrée
  displayValues(savedValues);

  // Sélection du bouton d'enregistrement
  const saveButton = document.querySelector(".saveButton");

  // Écouter l'événement clic sur le bouton Enregistrer
  saveButton.addEventListener('click', function () {
    // Récupération des valeurs depuis les champs d'entrée
    const inputValues = {
      age: ageInput.value,
      taille: tailleInput.value,
      poids: poidsInput.value,

      nom: nomInput.value,
      exp: expInput.value,
      arg: argInput.value,
    };

    // Mettre à jour les valeurs avec celles des champs d'entrée actuels
    savedValues = inputValues;

    // Sauvegarde des valeurs dans le local storage
    localStorage.setItem('inputValues', JSON.stringify(savedValues));

    alert('Valeurs enregistrées dans le local storage !');
  });
});