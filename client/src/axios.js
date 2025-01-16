import axios from 'axios';

console.log(`process.env.REACT_APP_BACKEND_URL = ${process.env.REACT_APP_BACKEND_URL}`)

// Local development: `http://localhost:7071`
// Deployed to Azure Static Web Apps with managed functions: ``
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || '',
    validateStatus: function (status) {
        return status >= 200 && status < 400; // Accept all status codes from 200 to 399
      }
});

export default instance;