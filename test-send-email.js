// test-send-email.js
const sendEmail = require('./sendReport'); // Path to sendEmail function

sendEmail().then(() => {
  console.log('Email sent successfully');
}).catch((error) => {
  console.error('Error sending email:', error);
});
