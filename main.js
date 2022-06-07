const brands = [
  {
    iconName: "adobe",
    brandName: "Adobe",
    color: "#ff0000"
  },
  {
    iconName: "amazon",
    brandName: "Amazon",
    color: "#333333"
  },
  {
    iconName: "android",
    brandName: "Android",
    color: "#a4c639"
  },
  
  {
    iconName: "apple",
    brandName: "Apple",
    color: "#aaaaaa"
  },
 
  {
    iconName: "blackberry",
    brandName: "BlackBerry",
    color: "#000000" 
  },
  
  {
    iconName: "bluetooth",
    brandName: "Bluetooth",
    color: "#3b5998" 
  },
  {
    iconName: "chrome",
    brandName: "Google Chrome",
    color: "#333333" 
  },
  {
    iconName: "discord",
    brandName: "Discord",
    color: "#7289da"
  },
  {
    iconName: "edge",
    brandName: "Microsoft Edge",
    color: "#0078d7" 
  },

  {
    iconName: "firefox",
    brandName: "Firefox",
    color: "#e66000" 
  },

  {
    iconName: "google",
    brandName: "Google",
    color: "#333333" 
  },
  {
    iconName: "google-play",
    brandName: "Google Play",
    color: "#3bccff" 
  },

  {
    iconName: "instagram",
    brandName: "Instagram",
    color: "#e1306c" 
  },
  {
    iconName: "internet-explorer",
    brandName: "Internet Explorer",
    color: "#1ebbee" 
  },

  {
    iconName: "java",
    brandName: "Java",
    color: "#5382a1" 
  },

  {
    iconName: "linkedin",
    brandName: "LinkedIn",
    color: "#0077b5" 
  },
  {
    iconName: "linux",
    brandName: "Linux",
    color: "#000000" 
  },

  {
    iconName: "microsoft",
    brandName: "Microsoft",
    color: "#111111" 
  },
 
  {
    iconName: "python",
    brandName: "Python",
    color: "#4584b6" 
  },
  {
    iconName: "quora",
    brandName: "Quora",
    color: "#a82400" 
  },

  {
    iconName: "snapchat-square",
    brandName: "Snapchat",
    color: "#fffc00" 
  },
  {
    iconName: "spotify",
    brandName: "Spotify",
    color: "#1db954" 
  },
 
  {
    iconName: "twitter",
    brandName: "Twitter",
    color: "#1da1f2" 
  },
  
  {
    iconName: "whatsapp",
    brandName: "WhatsApp",
    color: "#075e54" 
  },

    {
    iconName: "windows",
    brandName: "Microsoft Windows",
    color: "#0078d7" 
  },

  {
    iconName: "yahoo",
    brandName: "Yahoo!",
    color: "#410093" 
  },
  {
    iconName: "youtube",
    brandName: "YouTube",
    color: "#ff0000" 
  }
];
let correct = 0;
let total = 0;
const totalDraggableItems = 5;
const totalMatchingPairs = 5; // Should be <= totalDraggableItems

const scoreSection = document.querySelector(".score");
const correctSpan = scoreSection.querySelector(".correct");
const totalSpan = scoreSection.querySelector(".total");
const playAgainBtn = scoreSection.querySelector("#play-again-btn");

const draggableItems = document.querySelector(".draggable-items");
const matchingPairs = document.querySelector(".matching-pairs");
let draggableElements;
let droppableElements;

initiateGame();

function initiateGame() {
  const randomDraggableBrands = generateRandomItemsArray(totalDraggableItems, brands);
  const randomDroppableBrands = totalMatchingPairs<totalDraggableItems ? generateRandomItemsArray(totalMatchingPairs, randomDraggableBrands) : randomDraggableBrands;
  const alphabeticallySortedRandomDroppableBrands = [...randomDroppableBrands].sort((a,b) => a.brandName.toLowerCase().localeCompare(b.brandName.toLowerCase()));
  
  // Create "draggable-items" and append to DOM
  for(let i=0; i<randomDraggableBrands.length; i++) {
    draggableItems.insertAdjacentHTML("beforeend", `
      <i class="fab fa-${randomDraggableBrands[i].iconName} draggable" draggable="true" style="color: ${randomDraggableBrands[i].color};" id="${randomDraggableBrands[i].iconName}"></i>
    `);
  }
  
  // Create "matching-pairs" and append to DOM
  for(let i=0; i<alphabeticallySortedRandomDroppableBrands.length; i++) {
    matchingPairs.insertAdjacentHTML("beforeend", `
      <div class="matching-pair">
        <span class="label">${alphabeticallySortedRandomDroppableBrands[i].brandName}</span>
        <span class="droppable" data-brand="${alphabeticallySortedRandomDroppableBrands[i].iconName}"></span>
      </div>
    `);
  }
  
  draggableElements = document.querySelectorAll(".draggable");
  droppableElements = document.querySelectorAll(".droppable");
  
  draggableElements.forEach(elem => {
    elem.addEventListener("dragstart", dragStart);
    // elem.addEventListener("drag", drag);
    // elem.addEventListener("dragend", dragEnd);
  });
  
  droppableElements.forEach(elem => {
    elem.addEventListener("dragenter", dragEnter);
    elem.addEventListener("dragover", dragOver);
    elem.addEventListener("dragleave", dragLeave);
    elem.addEventListener("drop", drop);
  });
}

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id); // or "text/plain"
}

//Events fired on the drop target

function dragEnter(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.preventDefault();
  }
}

function dragLeave(event) {
  if(event.target.classList && event.target.classList.contains("droppable") && !event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("droppable-hover");
  const draggableElementBrand = event.dataTransfer.getData("text");
  const droppableElementBrand = event.target.getAttribute("data-brand");
  const isCorrectMatching = draggableElementBrand===droppableElementBrand;
  total++;
  if(isCorrectMatching) {
    const draggableElement = document.getElementById(draggableElementBrand);
    event.target.classList.add("dropped");
    draggableElement.classList.add("dragged");
    draggableElement.setAttribute("draggable", "false");
    event.target.innerHTML = `<i class="fab fa-${draggableElementBrand}" style="color: ${draggableElement.style.color};"></i>`;
    correct++;  
  }
  scoreSection.style.opacity = 0;
  setTimeout(() => {
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    scoreSection.style.opacity = 1;
  }, 200);
  if(correct===Math.min(totalMatchingPairs, totalDraggableItems)) { // Game Over!!
    playAgainBtn.style.display = "block";
    setTimeout(() => {
      playAgainBtn.classList.add("play-again-btn-entrance");
    }, 200);
  }
}

// Other Event Listeners
playAgainBtn.addEventListener("click", playAgainBtnClick);
function playAgainBtnClick() {
  playAgainBtn.classList.remove("play-again-btn-entrance");
  correct = 0;
  total = 0;
  draggableItems.style.opacity = 0;
  matchingPairs.style.opacity = 0;
  setTimeout(() => {
    scoreSection.style.opacity = 0;
  }, 100);
  setTimeout(() => {
    playAgainBtn.style.display = "none";
    while (draggableItems.firstChild) draggableItems.removeChild(draggableItems.firstChild);
    while (matchingPairs.firstChild) matchingPairs.removeChild(matchingPairs.firstChild);
    initiateGame();
    correctSpan.textContent = correct;
    totalSpan.textContent = total;
    draggableItems.style.opacity = 1;
    matchingPairs.style.opacity = 1;
    scoreSection.style.opacity = 1;
  }, 500);
}

// Auxiliary functions
function generateRandomItemsArray(n, originalArray) {
  let res = [];
  let clonedArray = [...originalArray];
  if(n>clonedArray.length) n=clonedArray.length;
  for(let i=1; i<=n; i++) {
    const randomIndex = Math.floor(Math.random()*clonedArray.length);
    res.push(clonedArray[randomIndex]);
    clonedArray.splice(randomIndex, 1);
  }
  return res;
}