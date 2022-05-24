// used libraries
const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');
const axios = require('axios');
const fs = require("fs").promises
const mongoose = require("mongoose");
const { appendFile } = require('fs');
const Schema = mongoose.Schema;

// connect modules
const config = require("./config");
const NewUser = require("./UserShema");


// connect DB
mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true });


// connection to the bot
const bot = new Telegraf(config.token);

bot.start((ctx)=> {
    
});
bot.launch();


// Запись
// const User = new user(obj);
// let element = await User.save();

// Поиск
// const User = await user.find({name:'Gasdgor'})
// const User = await user.find()

// Удаление
// User.forEach(async (item)=>{
//     let result = await user.deleteOne(item)
//     console.log(result)
// })
// console.log(User)

// Обновление 
// db.users.replaceOne({name: "Bob"}, {name: "Bob", age: 25})



