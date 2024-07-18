const fs = require("fs");
const path = require('path')

/**
 * 保存文件
 * @param {*} path 文件路径
 * @param {*} data 数据
 */
function writeFile(path, data) {
  fs.writeFile(path, data + ',\n', {flag: 'a'},(err) => {
    if (err) throw err;
    console.log("Data written to file");
  });
}



/**
 * 根据日期检查聊天存放目录,不存在则创建,然后返回目录
 * @returns {string} 聊天记录存放路径
 */
const getChatRecordPath = () => {
  const date = new Date()
  const toPad2 = num => num.padStart(2, '0')
  const chatRecordPath = path.join(
    __dirname,
    `${date.getFullYear()}${toPad2(`${date.getMonth() + 1}`)}${toPad2(
      `${date.getDate()}`
    )}_chatRecord.json`
  )
  // if (!fs.existsSync(chatRecordPath)) {
  //   fs.mkdirSync(chatRecordPath)
  // }
  return chatRecordPath
}

module.exports = {
    getChatRecordPath,
    writeFile
}