// Handle registration of a new patient
document.getElementById("registerForm")?.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("patientName").value;
  const age = document.getElementById("patientAge").value;
  const gender = document.getElementById("patientGender").value;
  const disease = document.getElementById("patientDisease").value;
  const contact = document.getElementById("patientContact").value;

  // Validate contact number
  const contactRegex = /^\d{10}$/;
  if (!contactRegex.test(contact)) {
      alert("Please enter a valid 10-digit contact number.");
      return;
  }

  if (name && age && gender && disease && contact) {
      let patients = JSON.parse(localStorage.getItem("patients")) || [];
      patients.push({
          name,
          age,
          gender,
          disease,
          contact,
          date: new Date().toLocaleDateString(),
          status: "Not Vaccinated",
      });
      localStorage.setItem("patients", JSON.stringify(patients));
      alert("Patient registered successfully!");
      window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
      alert("Please fill out all fields.");
  }
});

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html"; // Redirect to login page
}
