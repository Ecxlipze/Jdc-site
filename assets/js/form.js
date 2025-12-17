 const steps = {
      1: document.getElementById("step1"),
      2: document.getElementById("step2"),
      3: document.getElementById("step3"),
    };
    const stepIndicators = [...document.querySelectorAll(".step[data-step-ind]")];

    function setActiveStep(n){
      Object.values(steps).forEach(s => s.classList.add("hidden"));
      steps[n].classList.remove("hidden");
      stepIndicators.forEach(el => el.classList.toggle("active", Number(el.dataset.stepInd) === n));
    }

    function showErr(id, show){
      const el = document.getElementById(id);
      if(!el) return;
      el.classList.toggle("show", !!show);
    }

    function validateStep1(){
      const amount = Number(document.getElementById("amount").value);
      const donationFor = document.getElementById("donationFor").value;

      const amountOk = Number.isFinite(amount) && amount > 0;
      const donationForOk = donationFor !== "";

      showErr("amountErr", !amountOk);
      showErr("donationForErr", !donationForOk);

      return amountOk && donationForOk;
    }

    function validateStep2(){
      const firstName = document.getElementById("firstName").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();

      const firstOk = firstName.length >= 2;
      const phoneOk = phone.length >= 6;
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      showErr("firstNameErr", !firstOk);
      showErr("phoneErr", !phoneOk);
      showErr("emailErr", !emailOk);

      return firstOk && phoneOk && emailOk;
    }

    function formatPKR(n){
      const v = Number(n || 0);
      return "Rs" + v.toFixed(2);
    }

    // STEP 1: Next -> show bullet loader -> go Step 2
    document.getElementById("next1").addEventListener("click", () => {
      if(!validateStep1()) return;

      const nextBtn = document.getElementById("next1");
      const loader = document.getElementById("bulletLoader1");

      nextBtn.disabled = true;
      loader.style.display = "inline-block";

      setTimeout(() => {
        loader.style.display = "none";
        nextBtn.disabled = false;
        setActiveStep(2);
      }, 900);
    });

    // STEP 2
    document.getElementById("back2").addEventListener("click", () => setActiveStep(1));
    document.getElementById("next2").addEventListener("click", () => {
      if(!validateStep2()) return;

      // push amount to step3
      const amount = Number(document.getElementById("amount").value);
      document.getElementById("donationAmountText").textContent = formatPKR(amount);

      setActiveStep(3);
    });

    // STEP 3
    document.getElementById("back3").addEventListener("click", () => setActiveStep(2));
    document.getElementById("submit").addEventListener("click", () => {
      alert("Confirmed (demo). Hook payment gateway here.");
    });