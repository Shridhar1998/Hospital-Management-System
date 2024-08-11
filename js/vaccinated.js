// vaccinated.js

// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('loggedIn')) {
      window.location.href = 'index.html'; // Redirect to login if not logged in
  } else {
      loadVaccinatedPatients();
  }
});

// Load vaccinated patients from local storage
function loadVaccinatedPatients() {
  const vaccinatedPatients = JSON.parse(localStorage.getItem('vaccinatedPatients')) || [];
  populateTable('vaccinatedTable', vaccinatedPatients);
}

// Populate the vaccinated patients table
function populateTable(tableId, data) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  if (data.length === 0) {
      document.getElementById('noDataMessage').style.display = 'block';
      return;
  }

  document.getElementById('noDataMessage').style.display = 'none';
  data.forEach(patient => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.gender}</td>
          <td>${patient.disease}</td>
          <td>${patient.date}</td>
          <td>${patient.status}</td>
          <td><button onclick="removeVaccinatedPatient('${patient.name}')">Remove</button></td>
      `;
      tbody.appendChild(row);
  });
}

// Remove a vaccinated patient
function removeVaccinatedPatient(patientName) {
  let vaccinatedPatients = JSON.parse(localStorage.getItem('vaccinatedPatients')) || [];
  const updatedVaccinatedPatients = vaccinatedPatients.filter(patient => patient.name !== patientName);
  localStorage.setItem('vaccinatedPatients', JSON.stringify(updatedVaccinatedPatients));
  populateTable('vaccinatedTable', updatedVaccinatedPatients);
}

// Apply filters on the dashboard
function applyFilters() {
  // const date = document.getElementById('filterDate').value;
  const age = document.getElementById('filterAge').value;
  const gender = document.getElementById('filterGender').value;
  
  let patients = JSON.parse(localStorage.getItem('vaccinatedPatients')) || [];
  
  // console.log(date)
  // if (date) {
  //     patients = patients.filter(patient => patient.date === date);
  // }
  if (age) {
      patients = patients.filter(patient => patient.age == age);
  }
  if (gender) {
      patients = patients.filter(patient => patient.gender === gender);
  }

  populateTable('vaccinatedTable', patients);
}

// Clear all filters and reload patients
function clearFilters() {
  // document.getElementById('filterDate').value = '';
  document.getElementById('filterAge').value = '';
  document.getElementById('filterGender').value = '';
  loadVaccinatedPatients();
}


function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html'; // Redirect to login page
}