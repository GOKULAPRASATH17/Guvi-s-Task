function validateForm() {
  
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPasswordInput = document.querySelector('#confirm_password');

  
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

 
  if (!usernameRegex.test(username.value)) {
    alert("Please enter a valid username.");
    return false;
  }

  
  if (!emailRegex.test(email.value)) {
    alert("Please enter a valid email address.");
    return false;
  }

  
  if (!passwordRegex.test(password.value)) {
    alert("Password must be at least 8 characters long and contain at least one letter and one number.");
    return false;
  }
  if (password.value !== confirmPasswordInput.value) {
    alert("Passwords don't match. Please try again.");
    return false;
  }


  
  return true;
}