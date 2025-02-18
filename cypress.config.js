require('dotenv').config(); // Load environment variables from .env
const axios = require("axios");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mocha-junit-reporter, cypress-mochawesome-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
      toConsole: true
    },
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      videoOnFailOnly: false,
      json: true,  // ✅ Enabled JSON reports for merging
      reportDir: 'cypress/reports/mocha'
    }
  },
  e2e: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    video: true,
    retries: {
      runMode: 2,  // Retries failed tests 2 times in CI mode
      openMode: 1, // Retries failed tests 1 time in interactive mode
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);

      // ✅ Register the email sending task properly
      on("task", {
        sendTestReportEmail() {
          const sendEmail = require('./sendReport');
          return sendEmail()
            .then(() => {
              console.log("✅ Email sent successfully.");
              return null; // Ensure Cypress does not fail
            })
            .catch((error) => {
              console.error("❌ Email sending failed:", error);
              return null;
            });
        },
      });

      return config;
    },
  },
});
