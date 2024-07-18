const { buildJob, getBuildInfo, getQueue } = require('./jenkins');
const { writeFile, getChatRecordPath } = require('./saveFile');
const { Kitten } = require('./mongodb');
const { bot } = require('./telegram');





// Handle callback queries
bot.on("callback_query", async (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let res;

  if (action === "buildAdminHouseUi") {
    res = await buildJob("house-ui");
  } else if (action === "buildAdminHouseClassic") {
    res = await buildJob("house-classic");
  } else if (action === "buildMemberH5") {
    res = await buildJob("member-ui");
  } else if (action === "buildMemberPc") {
    res = await buildJob("member-pc-ui");
  } else if (action === "checkAdminHouseUi") {
    res = await getBuildInfo("house-ui");
  } else if (action === "checkAdminHouseClassic") {
    res = await getBuildInfo("house-classic");
  } else if (action === "checkMemberH5") {
    res = await getBuildInfo("member-ui");
  } else if (action === "checkMemberPc") {
    res = await getBuildInfo("member-pc-ui");
  }
  console.log("---res:---", res);
  bot.editMessageText(JSON.stringify(res), opts);
});

// Matches /editable
bot.onText(/^\/b/, (msg) => {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [{text: "代理端(黄)", callback_data: "buildAdminHouseUi"}, {text: "代理端(蓝)", callback_data: "buildAdminHouseClassic"}],
        [{text: "会员端(黄 H5)", callback_data: "buildMemberH5"}, {text: "会员端(蓝 PC)", callback_data: "buildMemberPc"}],
      ],
    },
  };
  bot.sendMessage(msg.chat.id, "どちらをしようか？🤨", opts);
});
bot.onText(/^\/c/, (msg) => {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{text: "代理端(黄)",callback_data: "checkAdminHouseUi"},{text: "代理端(蓝)",callback_data: "checkAdminHouseClassic"}],
        [{text: "会员端(黄 H5)",callback_data: "checkMemberH5"},{text: "会员端(蓝 PC)",callback_data: "checkMemberPc"}],
      ],
    },
  };
  bot.sendMessage(msg.chat.id, "检查部署状态", opts);
});
bot.onText(/^\/q/, (msg) => {
  getQueue().then((res) => {
    const { queue, queueLX } = res;
    const message = `jenkins构建队列:${queue.length}个\njenkins龙行构建队列:${queueLX.length}个`;
    bot.sendMessage(msg.chat.id, JSON.stringify(res));
  });
});
bot.on("message", (msg) => {
  console.log("---msg---", msg);
  const chatRecordPath = getChatRecordPath()
  writeFile(chatRecordPath, JSON.stringify(msg));
  new Kitten({id:msg.message_id, name: msg.from.username, message: msg.text, time: new Date()}).save().then(() => console.log('meow'));
});






