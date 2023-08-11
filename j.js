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

//--------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const nomTextView = document.querySelector('.nomTextView');
  const expTextView = document.querySelector('.expTextView');
  const levelTextView = document.querySelector('.levelTextView');
  
  function displayValues(inputValues) {
    
    function updateLevel(currentExperience) {
  let level = 1;
  while (currentExperience >= 15 * level ** 2 + 0 * level + 10) {
    level++;
  }
  return level - 1; // Soustraire 1 car le niveau a été incrémenté une fois de trop
}

// Utilisation de la fonction pour tester
let currentExperience = inputValues.exp; // Mettez ici la quantité d'expérience que vous avez gagnée
const newLevel = updateLevel(currentExperience);

// Affichage du niveau
if (levelTextView) {
  levelTextView.innerText = newLevel;
}

  if (nomTextView) {
    nomTextView.innerText = inputValues.nom || 'Aucune valeur enregistrée';
  }
  if (expTextView) {
    expTextView.innerText = inputValues.exp || 'Aucune valeur enregistrée';
  }

  const barLevel = document.querySelector(".progressbar");
  const progressBar = document.querySelector(".progress");
  
  
  function updateProgressBar(experience, maxExperience) {
    if (experience >= 0 && experience <= maxExperience) {
      const percentage = (experience / maxExperience) * 100;
      progressBar.style.width = percentage + "%";
      progressBar.style.transition = "width 0.5s ease";
    }
  }

  const currentLevelMaxExp = 15 * newLevel ** 2 + 0 * newLevel + 10;
    const nextLevelMaxExp = 15 * (newLevel + 1) ** 2 + 0 * (newLevel + 1) + 10;

    // Mettre à jour la barre de niveau lors du survol
    barLevel.updateProgressBar(currentExperience, currentLevelMaxExp); // Mettre la barre au pourcentage d'expérience actuel lors du survol
    
  
}

  // Récupérer les valeurs depuis le stockage local
  const savedValuesJSON = localStorage.getItem("inputValues");
  const savedValues = JSON.parse(savedValuesJSON) || {};

  // Appel de la fonction pour afficher les valeurs
  displayValues(savedValues);
});

//--------------------------------------------------------------------------------------------
const dateInput = document.querySelector("#dateInput");
const taskInput = document.querySelector("#taskInput");
const expInput = document.querySelector("#expInput");
const argInput = document.querySelector("#argInput");
const contener = document.querySelector(".input")

const button = document.querySelector("button");
const todoList = document.querySelector(".todolist");

// action ------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", getTodos);
button.addEventListener("click", addTask);
todoList.addEventListener("click", deleteCheck);

function addTask(event) {
    event.preventDefault();

    // Todo DIV  // <div class"todo"></div>
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Div pour les valeurs des inputs
    const inputValuesDiv = document.createElement("div");
    inputValuesDiv.classList.add("input-values");

    const dateDiv = document.createElement("div");
    dateDiv.innerText = dateInput.value;
    dateDiv.classList.add("date-item");
    inputValuesDiv.appendChild(dateDiv);

    const taskDiv = document.createElement("div");
    taskDiv.innerText = taskInput.value;
    taskDiv.classList.add("task-item");
    inputValuesDiv.appendChild(taskDiv);

    const expDiv = document.createElement("div");
    expDiv.innerText = expInput.value+' '+'exp';
    expDiv.classList.add("exp-item");
    inputValuesDiv.appendChild(expDiv);

    const argDiv = document.createElement("div");
    argDiv.innerHTML = argInput.value+' '+'<i class="fa-solid fa-coins"></i>';
    argDiv.classList.add("arg-item");
    inputValuesDiv.appendChild(argDiv);

    // Ajouter le div contenant les valeurs des inputs à la todoDiv
    todoDiv.appendChild(inputValuesDiv);

    // Bouton Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Bouton Supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Ajouter la todo au localstorage
    saveLocalTodos([dateInput.value, taskInput.value, expInput.value, argInput.value]);

    // AJOUTER NOTRE TODO À TODO-LIST
    todoList.appendChild(todoDiv);

    // Vider les champs des inputs
    dateInput.value = "";
    taskInput.value = "";
    expInput.value = "";
    argInput.value = "";
    
}

function deleteCheck(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    todo.remove();
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    removeLocalTodos(todo);

    const savedValues = JSON.parse(localStorage.getItem('inputValues')) || {};
    const expInput = document.getElementById('expInput'); // Cibler le champ d'expérience par ID
    savedValues.exp = (parseInt(savedValues.exp) || 0) + parseInt(expInput.value);
    localStorage.setItem("inputValues", JSON.stringify(savedValues));

    todo.remove();
  }
}


  
function saveLocalTodos(todo) {
    //Checker si il y a des items existants
    let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    // Effacer la liste actuelle
    todoList.innerHTML = '';

    todos.forEach(function (todo) {
        // Créer la structure pour chaque tâche
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // Div pour les valeurs des inputs
        const inputValuesDiv = document.createElement("div");
        inputValuesDiv.classList.add("input-values");

        const dateDiv = document.createElement("div");
        dateDiv.innerText = todo[0];
        dateDiv.classList.add("date-item");
        inputValuesDiv.appendChild(dateDiv);

        const taskDiv = document.createElement("div");
        taskDiv.innerText = todo[1];
        taskDiv.classList.add("task-item");
        inputValuesDiv.appendChild(taskDiv);

        const expDiv = document.createElement("div");
        expDiv.innerText = todo[2]+' '+'exp';
        expDiv.classList.add("exp-item");
        inputValuesDiv.appendChild(expDiv);

        const argDiv = document.createElement("div");
        argDiv.innerHTML = todo[3]+'  '+'<i class="fa-solid fa-coins"></i>';
        argDiv.classList.add("arg-item");
        inputValuesDiv.appendChild(argDiv);

        // Ajouter le div contenant les valeurs des inputs à la todoDiv
        todoDiv.appendChild(inputValuesDiv);

        // Bouton Check
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Bouton Supprimer
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Ajouter la tâche à la todoList
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}