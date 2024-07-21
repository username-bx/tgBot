const { buildJob, getBuildInfo, getQueue } = require('./jenkins');
const { writeFile, getChatRecordPath } = require('./saveFile');
const { insertOneMessagePB, insertOneMessageChatRecord, insertOneImageChatRecord } = require('./mongodb');
const { bot } = require('./telegram');
const { job } = require('./schedule');
// job.start();




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
  } else if (action === "save1") {
    // res = callbackQuery;
    return insertOneMessagePB({ ...callbackQuery, type: "零食" });
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
  console.log("---msg---", JSON.stringify(msg));
  const chatRecordPath = getChatRecordPath()
  writeFile(chatRecordPath, JSON.stringify(msg));
  if (msg && msg.entities && msg.entities[0].type === "mention") {
    return insertOneMessagePB(msg)
  } else if (msg && msg.photo && msg.photo.length > 0) {
    insertOneImageChatRecord(msg)
  }
  insertOneMessageChatRecord(msg)
});


// 记账
bot.onText(/^\/jz/, (msg) => {
  const chatId = msg.chat.id;
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [{text: "零食", switch_inline_query_current_chat: '零食 money: '}, {text: "饭费", switch_inline_query_current_chat: '饭费 money: '}],
        [{text: "衣服", switch_inline_query_current_chat: '衣服 money: '}, {text: "日常用品", switch_inline_query_current_chat: '日常用品 money: '}],
        [{text: "水电住宿", switch_inline_query_current_chat: '水电住宿 money: '}, {text: "交通", switch_inline_query_current_chat: '交通 money: '}],
      ],
    },
  };
  bot.sendMessage(chatId, "选择记账类型", opts);
});



