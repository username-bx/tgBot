// const axios = require("axios");
const Jenkins = require("jenkins");
const jenkins  = new Jenkins({
  baseUrl: "http://benjamin:123456@18.167.78.168:8080",
});
// jenkins.info().then((data) => {
//     console.log("info", data);
// });
// jenkins.job.build({name: 'admin-ui-dev', token: 'bot'}).then((buildRes) => {
//     console.log("buildRes", buildRes);
// })
jenkins.job.get("admin-ui-dev").then((data) => {
    console.log("job get", data);
})
// jenkinsIns.job.build({name: 'admin-ui-dev', token: 'bot'})
// jenkinsIns.job.get("admin-ui-dev")
// jenkins.last_completed_build_info("admin-ui-dev", function(err, data) {
//     if (err) {
//         console.log("error", err);
//     }
//     console.log("data", data);
// });
// jenkins.build("admin-ui-dev", {token: 'bot'}, function(err, data) {
//     if (err) {
//         console.log("error", err);
//     }
//     console.log("data", data);
// });
// import axios from "axios";
// 参数配置
// marlow 机器人
// const TOKEN = "7358488910:AAHNzVTpLMprFGH4tLIgrkZ1nwP0AIQCLuk";
// const TARGET_CHANNEL_ID = -4240348799;
// const url = `https://api.telegram.org/bot${TOKEN}/getUpdates`;
// axios.get(url).then((res) => {
//   const result = res.data.result;
// //   console.log(res);
//   if (result && result.length > 0) {
//     const resultJson = JSON.stringify(result);
//     console.log(resultJson);
//   }
// });

// const getBuildStatus = 'http://18.167.78.168:8080/view/dev/job/admin-ui-dev/lastBuild/'
// axios.get(getBuildStatus).then((res) => {
//     const result = res.data.result;
//   //   console.log(res);
//     if (result && result.length > 0) {
//       const resultJson = JSON.stringify(result);
//       console.log(resultJson);
//     }
//   });


// const buildUrl = 'http://18.167.78.168:8080/view/dev/job/admin-ui-dev/build?token=bot'
// axios.post(buildUrl)