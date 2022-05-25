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
const stage = require("./stage")


// connect DB
mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true });


// connection to the bot
const bot = new Telegraf(config.token);
bot.use(session())
bot.use(stage())

bot.start(async ctx => {
    const search = await NewUser.find({id:ctx.update.message.from.id});
    if(search.length == 0){
        const obj = {
            id:`${ctx.update.message.from.id}`,
            first_name:ctx.update.message.from.first_name,
            last_name:ctx.update.message.from.last_name,
            username:ctx.update.message.from.username,
            notes:{}
        }
        const run = new NewUser(obj);
        const save = run.save();
    }
    ctx.scene.enter('firstScenes') ;
} );

// bot.use(session())
// bot.use(stage())
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



