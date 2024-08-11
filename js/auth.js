document.addEventListener('DOMContentLoaded', function() {

  // Signup form handling
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const email = document.getElementById('signupEmail').value;
          const password = document.getElementById('signupPassword').value;
          const username = document.getElementById('signupUsername').value;

          // Basic email validation using regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailRegex.test(email)) {
              document.getElementById('emailError').textContent = 'Please enter a valid email address.';
              return;
          } else {
              document.getElementById('emailError').textContent = '';
          }

          // Store user data in localStorage
          const user = {
              username: username,
              email: email,
              password: password
          };

          localStorage.setItem('user', JSON.stringify(user));
          alert('Signup successful! Please login.');
          window.location.href = 'index.html'; // Redirect to login page after signup
      });
  }

  // Login form handling
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();

          const email = document.getElementById('loginEmail').value;
          const password = document.getElementById('loginPassword').value;

          // Basic email validation using regex
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          if (!emailRegex.test(email)) {
              document.getElementById('emailError').textContent = 'Please enter a valid email address.';
              return;
          } else {
              document.getElementById('emailError').textContent = '';
          }

          // Retrieve user data from localStorage
          const storedUser = JSON.parse(localStorage.getItem('user'));

          if (storedUser && storedUser.email === email && storedUser.password === password) {
              localStorage.setItem('loggedIn', true);
              window.location.href = 'dashboard.html'; // Redirect to dashboard on successful login
          } else {
              document.getElementById('loginError').textContent = 'Invalid email or password.';
          }
      });
  }

  // Logout function for use in other pages
  window.logout = function() {
      localStorage.removeItem('loggedIn');
      window.location.href = 'index.html'; // Redirect to login page on logout
  }
});
