const TelegramBot = require("node-telegram-bot-api");
const token = "7358488910:AAHNzVTpLMprFGH4tLIgrkZ1nwP0AIQCLuk";
const groupId = -4240348799;
const botOptions = {
  polling: { interval: 3000 },
};
const bot = new TelegramBot(token, botOptions);
bot.getMe().then((me) => {
  console.log("Hi my name is %s!", me.username);
});

module.exports = {
    bot
}