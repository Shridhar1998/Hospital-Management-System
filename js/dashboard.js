function logout() {
  localStorage.removeItem('loggedIn');
  window.location.href = 'index.html'; // Redirect to login page
}

// Check if the user is logged in
document.addEventListener('DOMContentLoaded', function() {
  if (!localStorage.getItem('loggedIn')) {
      window.location.href = 'index.html'; // Redirect to login if not logged in
  } else {
      loadPatients();
  }

  // Attach event listeners to filter buttons
  document.querySelector('button[onclick="applyFilters()"]').addEventListener('click', applyFilters);
  document.querySelector('button[onclick="clearFilters()"]').addEventListener('click', clearFilters);
});

// Load patients from local storage
function loadPatients() {
  const patients = JSON.parse(localStorage.getItem('patients')) || [];
  populateTable('patientsTable', patients);
}

// Populate the patients table
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
      let d= patient.date.split('/')
      let date= `${d[1]}/${d[0]}/${d[2]}`
      row.innerHTML = `
          <td>${patient.name}</td>
          <td>${patient.age}</td>
          <td>${patient.gender}</td>
          <td>${patient.disease}</td>
          <td>${date}</td>
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
      const updatedPatients = patients.filter(patient => patient.name !== patientName);
      localStorage.setItem('patients', JSON.stringify(updatedPatients));
      addToVaccinated(vaccinatedPatient);
      populateTable('patientsTable', updatedPatients);
      window.location.href = 'vaccinated.html'; // Redirect to vaccinated page
  }
}

// Add vaccinated patient to vaccinated storage
function addToVaccinated(patient) {
  let vaccinatedPatients = JSON.parse(localStorage.getItem('vaccinatedPatients')) || [];
  vaccinatedPatients.push(patient);
  localStorage.setItem('vaccinatedPatients', JSON.stringify(vaccinatedPatients));
}

// Apply filters on the dashboard
function applyFilters() {
  // const date = document.getElementById('filterDate').value;
  const age = document.getElementById('filterAge').value;
  const gender = document.getElementById('filterGender').value;
  
  let patients = JSON.parse(localStorage.getItem('patients')) || [];
  
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

  populateTable('patientsTable', patients);
}

// Clear all filters and reload patients
function clearFilters() {
  // document.getElementById('filterDate').value = '';
  document.getElementById('filterAge').value = '';
  document.getElementById('filterGender').value = '';
  loadPatients();
}
