const CronJob = require("cron").CronJob;
const { start } = require("repl");
const { emailService } = require("../services");

/** Multiple send email */
new CronJob(
  "34 9 * * *",
  async () => {
    const userEmails = [
      "khushalvaghasiya1802@gmail.com",
      "jenilsavani23@gmail.com",
      "darshanvirani21@gmail.com",
    ];

    await emailService.sendMail(
      userEmails,
      "Hello sir ! 😊 Good morning! 🌞 ! Have a nice day :) ☀️ New day is a new start 💪",
      "Owner Morning message"
    );
  },
  null,
  false,
  "Asia/Kolkata"
).start();
