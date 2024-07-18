// 以下参数分别填写您的 mongodb 用户名，密码，实例 IP 地址 和 端口号
// var dbUri = "mongodb://" + user + ":" + password + "@" + host + ":" + port + "/" + dbName;

const { MongoClient } = require("mongodb")
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
client.connect().then(() => {
  console.log('mongodb connected')
});
/**
 * 
 * @param {*} data 
 */
async function insertOneMessagePB(data) {
  try {
    const database = client.db("tgDB");
    const pocketBook = database.collection("pocketBook");
    const doc = {
      messageId: data.messageId,
      title: data.type,
      type: data.type,
      value: data.text,
      desc: data.desc,
      name: data.name,
      time: new Date().getTime(),
    }
    const result = await pocketBook.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close();
  }
}


/**
 * 存数据库
 * @param {*} data 
 */
async function insertOneMessageChatRecord(msg) {
  try {
    const database = client.db("tgDB");
    const chatRecord = database.collection("chatRecord");
    const doc = {
      messageId: msg.message_id,
      form: msg.from,
      message: msg.text,
      chat: msg.chat,
      time: new Date().getTime(),
      originMessage: msg
    }
    const result = await chatRecord.insertOne(doc);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } finally {
    // await client.close();
  }
}

module.exports = {
  insertOneMessagePB,
  insertOneMessageChatRecord
}