// ✅ rotating/typing words (mobile header)
  const words = ["Free Homes","Food","Clothes","Education","Healthcare","Hope"];
  const textEl = document.getElementById("jdc-rotate-word");

  if (textEl) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typingSpeed = 90;
    const deletingSpeed = 50;
    const holdAfterType = 1200;
    const holdAfterDelete = 400;

    function typeEffect() {
      const currentWord = words[wordIndex];

      if (!isDeleting) {
        textEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
          setTimeout(() => (isDeleting = true), holdAfterType);
        }
      } else {
        textEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(() => {}, holdAfterDelete);
        }
      }

      setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
    }

    typeEffect();
  }

  // header-js-end

  // Random avatar logo typing effect (no conflict version) 

const rotateWords = [
  "Free Homes",
  "Food",
  "Clothes",
  "Education",
  "Healthcare",
  "Hope"
];

const typingElement = document.getElementById("jdc-typing-text");

let currentWordIndex = 0;
let currentCharIndex = 0;
let deletingMode = false;

const TYPE_SPEED = 90;
const DELETE_SPEED = 50;
const HOLD_AFTER_TYPE = 1200;
const HOLD_AFTER_DELETE = 400;

function typingAnimation() {
  const activeWord = rotateWords[currentWordIndex];

  if (!deletingMode) {
    // Typing
    typingElement.textContent = activeWord.substring(0, currentCharIndex + 1);
    currentCharIndex++;

    if (currentCharIndex === activeWord.length) {
      setTimeout(() => (deletingMode = true), HOLD_AFTER_TYPE);
    }
  } else {
    // Deleting
    typingElement.textContent = activeWord.substring(0, currentCharIndex - 1);
    currentCharIndex--;

    if (currentCharIndex === 0) {
      deletingMode = false;
      currentWordIndex = (currentWordIndex + 1) % rotateWords.length;
      setTimeout(() => {}, HOLD_AFTER_DELETE);
    }
  }

  setTimeout(
    typingAnimation,
    deletingMode ? DELETE_SPEED : TYPE_SPEED
  );
}

typingAnimation();