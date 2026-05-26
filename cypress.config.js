const { defineConfig } = require("cypress");
const crypto = require('crypto');

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        generateB2bSignature({ clientId, time, privateKey }) {
          console.log("TASK: Received privateKey length:", privateKey ? privateKey.length : 0);
          // 1. Clean the private key (remove headers, newlines, and spaces)
          let cleanKey = privateKey
            .replace(/-----BEGIN RSA PRIVATE KEY-----/g, "")
            .replace(/-----END RSA PRIVATE KEY-----/g, "")
            .replace(/-----BEGIN PRIVATE KEY-----/g, "")
            .replace(/-----END PRIVATE KEY-----/g, "")
            .replace(/[\r\n\s]+/g, "");

          console.log("TASK: Cleaned key length:", cleanKey.length);

          // 2. Wrap back into valid PKCS#1 RSA Private Key PEM format with 64-character lines
          const lines = [];
          for (let i = 0; i < cleanKey.length; i += 64) {
            lines.push(cleanKey.slice(i, i + 64));
          }
          const pemKey = `-----BEGIN RSA PRIVATE KEY-----\n${lines.join('\n')}\n-----END RSA PRIVATE KEY-----`;
          console.log("TASK: Formatted pemKey:", pemKey.slice(0, 80), "...", pemKey.slice(-80));

          // 3. Generate SHA256withRSA signature
          const applyToken = `${clientId}|${time}`;
          const sign = crypto.createSign('SHA256');
          sign.update(applyToken, 'utf8');
          sign.end();
          
          return sign.sign(pemKey, 'base64');
        }
      });
    },
  },
});
