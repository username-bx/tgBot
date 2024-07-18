const CronJob = require('cron').CronJob;

const job = new CronJob('*/5 * * * *', () => {
  console.log('每隔5分钟执行一次的定时任务');
});

job.start();
bot.sendMessage(6662926132, '每隔1分钟执行一次的定时任务');