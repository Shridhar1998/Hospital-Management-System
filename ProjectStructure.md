hospital-management-system/
│
├── index.html         // Login page
├── signup.html        // Signup page
├── register.html      // Patient Registration page
├── dashboard.html     // Dashboard listing all patients
├── vaccinated.html    // Vaccinated patients page
│
├── css/
│   └── styles.css     // CSS file for styling
│
├── js/
│   ├── main.js        // JavaScript file for handling logic
│   └── data.js        // JavaScript file for managing patient data
│
└── assets/
    └── images/        // Folder for any images or icons


Sure! Below is the JavaScript code for handling the logic and data storage for your Hospital Management System project. This code includes user authentication and patient management using local storage.

### Explanation

1. **Local Storage Helpers**: Functions `getData` and `setData` are used to interact with local storage.
2. **Signup**: Adds a new user to local storage.
3. **Login**: Verifies if a user exists in local storage and logs them in.
4. **Check Auth**: Ensures that a user is logged in before accessing certain pages.
5. **Logout**: Removes the logged-in user from local storage.
6. **Register Patient**: Adds a new patient to local storage.
7. **Load Patients**: Loads patient data onto the dashboard.
8. **Mark as Completed/Vaccinated**: Updates patient status.

This basic implementation gives you a starting point to manage user authentication and patient data within a hospital management system using local storage.