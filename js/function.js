function showSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.display = "flex";
  setTimeout(() => {
    sidebar.style.transform = "translateX(0)";
  }, 10);
}

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.style.transform = "translateX(100%)";
  setTimeout(() => {
    sidebar.style.display = "none";
  }, 300);
}

// Main Swiper
const swiper = new Swiper(".swiper", {
  direction: "vertical",
  loop: true,
  speed: 2000,
  centeredSlides: true,

  autoplay: {
    delay: 2000,
    disableOnInteraction: true,
    reverseDirection: true,
  },
  controller: {
    inverse: true,
  },

  navigation: {
    nextEl: ".swiper-button-prev",
    prevEl: ".swiper-button-next",
  },
});

// List of sentences
var _CONTENT = ["Sports", "Music", "General", "Technology"];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Implements typing effect
function Type() {
  var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if (text === _CONTENT[_PART]) {
    clearInterval(_INTERVAL_VAL);
    setTimeout(function () {
      _INTERVAL_VAL = setInterval(Delete, 100);
    }, 1500);
  }
}

// Implements deleting effect
function Delete() {
  var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX--;

  // If sentence has been deleted then start to display the next sentence
  if (text === "") {
    clearInterval(_INTERVAL_VAL);

    // If last sentence then display the first one, else move to the next
    if (_PART == _CONTENT.length - 1) _PART = 0;
    else _PART++;
    _PART_INDEX = 0;

    // Start to display the next sentence after some time
    setTimeout(function () {
      _INTERVAL_VAL = setInterval(Type, 50);
    }, 50);
  }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);
