'use strict'

// used libraries
const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');
const axios = require('axios');
const fs = require("fs").promises
const mongoose = require("mongoose");
const { appendFile } = require('fs');
const Schema = mongoose.Schema;
const config = require("./config");
const user = require("./UserShema")

mongoose.connect(config.url, { useUnifiedTopology: true, useNewUrlParser: true });

let a = {
    name:"Gasdgor",age:21
}
async function run(obj){
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
}


index()
async function index(){
    console.log("UPP")
}


// connection to the bot
const bot = new Telegraf(config.token);

bot.start((ctx)=> {
    console.log(ctx.update)
});
bot.launch();

// async function main (arg){
//     let db = await fs.readFile('DataBase.json', 'utf8');
//     try {
//         db = JSON.parse(db);
//     }catch(err){
        
//     }
//     if(!db){

//     }
//     console.log(arg.message.from.id, db)
//     arg.reply("hi")
// }

// class NewUser {
//     constructor() { 

//     }
  
// }