const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/admin').then((err) => {
  console.log('mongoose connected')
});
// 以下参数分别填写您的 mongodb 用户名，密码，实例 IP 地址 和 端口号
// var dbUri = "mongodb://" + user + ":" + password + "@" + host + ":" + port + "/" + dbName;


const kittySchema = new mongoose.Schema({
  id: Number,
  name: String,
  message: String,
  time: { type: Date, default: Date.now }
});
const Kitten = mongoose.model('Kitten', kittySchema);



// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));


const { MongoClient, ServerApiVersion } = require("mongodb");



module.exports = {
    Kitten
}