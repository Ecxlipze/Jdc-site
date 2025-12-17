// desktop underline hover
  const nav = document.querySelector(".nav-hover");
  const underline = document.querySelector(".nav-underline");
  const links = document.querySelectorAll(".nav-hover .nav-link");

  function moveUnderline(el) {
    const rect = el.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    underline.style.width = rect.width + "px";
    underline.style.left = (rect.left - navRect.left) + "px";
    underline.style.opacity = "1";
  }

  links.forEach(link => link.addEventListener("mouseenter", () => moveUnderline(link)));

  nav.addEventListener("mouseleave", () => {
    underline.style.opacity = "0";
    underline.style.width = "0";
  });

  // mobile offcanvas
  const body = document.body;
  const menu = document.getElementById("mobileMenu");
  const overlay = document.getElementById("menuOverlay");
  const openBtnTop = document.getElementById("openMenuBtn");
  const openBtnBottom = document.getElementById("openMenuBtnBottom");
  const closeBtn = document.getElementById("closeMenuBtn");

  function openMenu(){
    menu.classList.add("open");
    overlay.classList.add("show");
    body.style.overflow = "hidden";
    menu.setAttribute("aria-hidden", "false");
  }

  function closeMenu(){
    menu.classList.remove("open");
    overlay.classList.remove("show");
    body.style.overflow = "";
    menu.setAttribute("aria-hidden", "true");
  }

  openBtnTop?.addEventListener("click", openMenu);
  openBtnBottom?.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if(e.key === "Escape" && menu.classList.contains("open")) closeMenu();
  });

  // accordion
  const campAcc = document.getElementById("campAcc");
  const campBtn = document.getElementById("campBtn");
  campBtn.addEventListener("click", () => campAcc.classList.toggle("open"));