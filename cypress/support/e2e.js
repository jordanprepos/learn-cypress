// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// A. Asymmetric Signature Helper (for Access Token API)
Cypress.generateAsymetricSignature = function(clientId, time, privateKey){
    return Cypress.task('generateB2bSignature', {
        clientId,
        time,
        privateKey
    })
}

// B. External ID Helper
Cypress.generateExternalId = function(){
    const min = 100000000000; 
    const max = 999999999999; 
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// C. Timestamp Helper
Cypress.generateTimestamp = function(){
    const date = new Date();
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = (num) => String(num).padStart(2, '0');
    
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const tzHours = pad(Math.floor(Math.abs(tzo) / 60));
    const tzMinutes = pad(Math.abs(tzo) % 60);
    
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${dif}${tzHours}:${tzMinutes}`;
}
    