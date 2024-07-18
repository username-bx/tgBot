const Jenkins = require("jenkins");
const jenkins = new Jenkins({
  baseUrl: "http://benjamin:123456@18.167.78.168:8080",
});
const jenkinsLX = new Jenkins({
  baseUrl:
    "http://tzcp007:kplMTSJKDU3eqHIwBPyAr9ZhV6jF1mfd@16.162.176.170:6969",
});
/**
 * 构建任务 8080端口
 * @param {string} jobName 任务名称
 */
async function buildJob(jobName) {
  const num = await jenkins.job.build({ name: jobName, token: "bot" });
  console.debug("----build job num----", num);
  const jobInfo = await jenkins.job.get(jobName);
  console.debug("----jobInfo----", jobInfo.nextBuildNumber);
  const { fullDisplayName, url, inQueue } = await jenkins.job.get(
    jobName,
    jobInfo.nextBuildNumber
  );
  return { fullDisplayName, url, inQueue };
}
/**
 * 构建任务 龙行天下 6969端口
 * @param {string} jobName 任务名称
 */
async function buildJobLX(jobName) {
  const num = await jenkinsLX.job.build({ name: jobName, token: "Benjamin" });
  console.debug("----build job num----", num);
  const jobInfo = await jenkinsLX.job.get(jobName);
  console.debug("----jobInfo----", jobInfo.nextBuildNumber);
  const afterBuildCheckStatus = await jenkinsLX.job.get(
    jobName,
    jobInfo.nextBuildNumber
  );
  return afterBuildCheckStatus;
}
/**
 *  获取构建信息
 * @param {string} jobName 任务名称
 */
async function getBuildInfo(jobName) {
  const jobInfo = await jenkins.job.get(jobName);
  const { action, fullDisplayName, result } = await jenkins.build.get(
    jobName,
    jobInfo.lastBuild.number
  );
  return { action, fullDisplayName, result };
}
async function getBuildInfoLX(jobName) {
  const jobInfo = await jenkinsLX.job.get(jobName);
  const { action, fullDisplayName, result } = await jenkinsLX.build.get(
    jobName,
    jobInfo.lastBuild.number
  );
  return { action, fullDisplayName, result };
}

async function getQueue() {
  const queue = await jenkins.queue.list();
  const queueLX = await jenkinsLX.queue.list();
  return { queue, queueLX };
}

jenkins.info().then((info) => {
  console.log("jenkins info", JSON.stringify(info.views));
});

module.exports = {
  jenkins,
  jenkinsLX,
  buildJob,
  buildJobLX,
  getBuildInfo,
  getBuildInfoLX,
  getQueue,
};

