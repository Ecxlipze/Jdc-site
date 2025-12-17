 // random avater logo 
  const words = [
    "Free Homes",
    "Food",
    "Clothes",
    "Education",
    "Healthcare",
    "Hope"
  ];

  const textEl = document.getElementById("jdc-rotate-word");

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
      // Typing
      textEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => (isDeleting = true), holdAfterType);
      }
    } else {
      // Deleting
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