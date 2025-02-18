require('dotenv').config(); // Load environment variables from .env
const axios = require("axios");
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    videoOnFailOnly: false,
    json: false,  // Disable JSON report generation
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

      // ✅ Send test results to Microsoft Teams after test run
      // on("after:run", async (results) => {
      //   const webhookUrl = "https://mechlintech0.webhook.office.com/webhookb2/03476bd3-4e20-4981-aa46-c93f78443318@85707f27-830a-4b92-aa8c-3830bfb6c6f5/IncomingWebhook/4d643527f0bd4bca80fc328f420cf30a/613a8bdf-10d6-4de7-a1e6-7334b19f8cb3/V2kMyom2I9XmemNg8n7yGd-Ry-ln5T6i5OgeONjuE8nGE1";

      //   const totalTests = results.totalTests || 0;
      //   const passed = results.totalPassed || 0;
      //   const failed = results.totalFailed || 0;
      //   const duration = (results.totalDuration / 1000).toFixed(2); // Convert ms to seconds
      //   const timestamp = new Date().toLocaleString();

      //   const message = {
      //     text: `🚀 **Cypress Test Run Completed**\n\n📊 **Test Summary**:\n- ✅ **Passed:** ${passed}\n- ❌ **Failed:** ${failed}\n- 🔄 **Total Tests:** ${totalTests}\n- ⏳ **Duration:** ${duration} seconds\n- 📅 **Run Time:** ${timestamp}`
      //   };

      //   try {
      //     await axios.post(webhookUrl, message);
      //     console.log("✅ Test results sent to Microsoft Teams successfully!");
      //   } catch (error) {
      //     console.error("❌ Failed to send test results to Teams:", error);
      //   }
      // });

      return config;
    },
  },
});
