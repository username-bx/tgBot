const Jenkins = require("jenkins");
const jenkins = new Jenkins({
  baseUrl: "http://benjamin:123456@18.167.78.168:8080",
});
const jenkinsLX = new Jenkins({
  baseUrl: "http://tzcp007:kplMTSJKDU3eqHIwBPyAr9ZhV6jF1mfd@16.162.176.170:6969",
});
// jenkins.info().then((data) => {
//     console.log("info", data);
// });
/**
 *
 * @param {string} jobName 任务名称
 */
async function buildJob(jobName) {
  const num = await jenkins.job.build({ name: jobName, token: "bot" })
  console.debug('----build job num----', num)
  const jobInfo = await jenkins.job.get(jobName)
  console.debug('----jobInfo----', jobInfo.nextBuildNumber)
  const { fullDisplayName, url, inQueue } = await jenkins.job.get(jobName, jobInfo.nextBuildNumber)
  return { fullDisplayName, url, inQueue }
}
async function buildJobLX(jobName) {
  const num = await jenkinsLX.job.build({ name: jobName, token: "Benjamin" })
  console.debug('----build job num----', num)
  const jobInfo = await jenkinsLX.job.get(jobName)
  console.debug('----jobInfo----', jobInfo.nextBuildNumber)
  const { fullDisplayName, url, inQueue } = await jenkinsLX.job.get(jobName, jobInfo.nextBuildNumber)
  return { fullDisplayName, url, inQueue }
}

/**
 *  获取构建信息 信息太长了
 * @param {string} jobName 任务名称
 */
async function getBuildInfo(jobName) {
  const jobInfo = await jenkins.job.get(jobName)
  const { action, fullDisplayName, result } = await jenkins.build.get(jobName, jobInfo.lastBuild.number)
  return { action, fullDisplayName, result }
}
async function getBuildInfoLX(jobName) {
  const jobInfo = await jenkinsLX.job.get(jobName)
  const { action, fullDisplayName, result } = await jenkinsLX.build.get(jobName, jobInfo.lastBuild.number)
  return { action, fullDisplayName, result }
}

async function getQueue() {
  const queue = await jenkins.queue.list()
  const queueLX = await jenkinsLX.queue.list()
  return { queue, queueLX }
}

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


// Handle callback queries
bot.on("callback_query", async (callbackQuery) => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
  };
  let text;
  let res;

  if (action === "buildAdminHouseUi") {
    res = await buildJobLX("house-ui");
  } else if (action === "buildAdminHouseClassic") {
    res = await buildJob("house-ui");
  } else if (action === "buildMemberH5") {
    res = await buildJob("member-ui");
  } else if (action === "buildMemberPc") {
    res = await buildJobLX("tzcp-member-pc-ui");
  } else if (action === "checkAdminHouseUi") {
    // res = await getJobInfo("admin-ui-dev");
    res = await getBuildInfoLX("house-ui")
  } else if (action === "checkAdminHouseClassic") {
    res = await getBuildInfo("house-ui");
  } else if (action === "checkMemberH5") {
    res = await getBuildInfo("member-ui");
  } else if (action === "checkMemberPc") {
    res = await getBuildInfoLX("tzcp-member-pc-ui");
  }
  console.log("---res:---", res)
  bot.editMessageText(JSON.stringify(res), opts);
});

// Matches /editable
bot.onText(/\/build/, (msg) => {
  const opts = {
    reply_to_message_id: msg.message_id,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "代理端(黄色版 U乐美)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "buildAdminHouseUi",
          },
          {
            text: "代理端(蓝色版 换皮后的)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "buildAdminHouseClassic",
          },
          {
            text: "会员端(黄色版 H5)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "buildMemberH5",
          },
          {
            text: "会员端(蓝色版 PC)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "buildMemberPc",
          },
        ],
      ],
    },
  };
  bot.sendMessage(msg.chat.id, "Original Text", opts);
});
// Matches /editable
bot.onText(/\/check/, (msg) => {
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "代理端(黄色版 U乐美)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "checkAdminHouseUi",
          },
          {
            text: "代理端(蓝色版 换皮后的)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "checkAdminHouseClassic",
          },
          {
            text: "会员端(黄色版 H5)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "checkMemberH5",
          },
          {
            text: "会员端(蓝色版 PC)",
            // we shall check for this value when we listen
            // for "callback_query"
            callback_data: "checkMemberPc",
          },
        ],
      ],
    },
  };
  bot.sendMessage(msg.chat.id, "Original Text", opts);
});
bot.onText(/\/q/, (msg) => {
  getQueue().then((res) => {
    bot.sendMessage(msg.chat.id, JSON.stringify(res));
  });
})