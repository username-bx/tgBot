const { bot } = require("./telegram");
const CronJob = require("cron").CronJob;
const job = new CronJob("*/1 * * * *", () => {
  console.log("每隔1分钟执行一次的定时任务");
  bot.sendMessage(6914665681, "欠我15000,记得还钱");
  // bot.sendMessage(6662926132, "欠我3000,记得还钱");
});
// job.start();
module.exports = {
  job,
};
