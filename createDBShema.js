

// 测试用例 mongodb

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
async function insertOneMessage(data) {
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
    await client.close();
  }
}


exports = {
  insertOneMessage
}