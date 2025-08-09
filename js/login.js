 const loginBtn = document.getElementById("loginBtn");
  const fullname = document.getElementById("fullname");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  // === CREDENTIAL VALIDATION ===
  function validateInputs() {
    const nameVal = fullname.value.trim().toLowerCase();
    const emailVal = email.value.trim().toLowerCase();
    const passVal = password.value;

    if (
      nameVal === "sathish" &&
      emailVal === "softlogic2025@gmail.com" &&
      passVal === "123456"
    ) {
      loginBtn.disabled = false;
    } else {
      loginBtn.disabled = true;
    }
  }

  fullname.addEventListener("input", validateInputs);
  email.addEventListener("input", validateInputs);
  password.addEventListener("input", validateInputs);


  // === AUTO LOGOUT AFTER 5 MINUTES ===
  let logoutTimer;

  function startLogoutTimer() {
    clearTimeout(logoutTimer); // clear any previous timer

    logoutTimer = setTimeout(() => {
      sessionStorage.clear(); // clear session data
      window.location.href = "index.html"; // redirect
    }, 1 * 60 * 1000); // 1 minute (change as needed)
  }

  // Reset timer on user activity
  function resetLogoutTimer() {
    startLogoutTimer();
  }

  // Listen for user activity
  window.onload = startLogoutTimer;
  document.onmousemove = resetLogoutTimer;
  document.onkeypress = resetLogoutTimer;
  document.onclick = resetLogoutTimer;
  document.onscroll = resetLogoutTimer;



  // === FORM SUBMISSION ===
  document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (loginBtn.disabled) return;

    sessionStorage.setItem("isLoggedIn", "true");
    window.location.href = "home.html"; // Redirect to home
  });

  // === ON PAGE LOAD ===
  window.addEventListener("load", () => {
    const isLoggedIn = sessionStorage.getItem("isLoggedIn");
    const isLoginPage = window.location.pathname.includes("index.html");

    if (!isLoggedIn && !isLoginPage) {
      window.location.href = "index.html";
    }

    startLogoutTimer(); // Start logout timer
  });

  // === RESET TIMER ON USER ACTIVITY ===
  ["click", "keypress", "mousemove", "scroll"].forEach(event => {
    window.addEventListener(event, startLogoutTimer);
  });