// main.js

// Initialize pages



// Handle logout
function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html'; // Redirect to login page
}

// Handle dashboard filtering and data
document.getElementById('applyFilters')?.addEventListener('click', function() {
  const date = document.getElementById('filterDate').value;
  const age = document.getElementById('filterAge').value;
  const gender = document.getElementById('filterGender').value;

  let patients = JSON.parse(localStorage.getItem('patients')) || [];

  if (date) {
      patients = patients.filter(patient => patient.date === date);
  }
  if (age) {
      patients = patients.filter(patient => patient.age == age);
  }
  if (gender) {
      patients = patients.filter(patient => patient.gender === gender);
  }

  populateTable('patientsTable', patients);
});

document.getElementById('clearFilters')?.addEventListener('click', function() {
  document.getElementById('filterDate').value = '';
  document.getElementById('filterAge').value = '';
  document.getElementById('filterGender').value = '';
  populateTable('patientsTable', JSON.parse(localStorage.getItem('patients')) || []);
});

// Populate table with data
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
          <td>${patient.disease}</td>
          <td>${patient.date}</td>
          <td>${patient.status}</td>
          <td><button onclick="vaccinatePatient('${patient.name}')">Vaccinate</button></td>
      `;
      tbody.appendChild(row);
  });
}

// Handle vaccinating a patient
function vaccinatePatient(patientName) {
  let patients = JSON.parse(localStorage.getItem('patients')) || [];
  const vaccinatedPatient = patients.find(patient => patient.name === patientName);
  if (vaccinatedPatient) {
      vaccinatedPatient.status = 'Vaccinated';
      localStorage.setItem('patients', JSON.stringify(patients.filter(patient => patient.name !== patientName)));
      populateTable('patientsTable', JSON.parse(localStorage.getItem('patients')) || []);
      window.location.href = 'vaccinated.html'; // Redirect to vaccinated page
  }
}

// Populate vaccinated patients
function populateVaccinatedTable() {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  const vaccinatedPatients = patients.filter(patient => patient.status === 'Vaccinated');
  populateTable('vaccinatedTable', vaccinatedPatients);
}

// Call populateVaccinatedTable() on the vaccinated page
if (window.location.pathname.endsWith('vaccinated.html')) {
  populateVaccinatedTable();
}
