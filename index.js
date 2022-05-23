'use strict'

// used libraries
const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');
const axios = require('axios');
const fs = require("fs").promises;
const mongoose = require("mongoose");
const { appendFile } = require('fs');
const Schema = mongoose.Schema;

const CONNECTION_URL = 'mongodb+srv://ku39:W810i104.@cluster0.k3pka.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true });

const UserSchema = new Schema({
    name:"String",
    age:"Number"
})
let user = mongoose.model("User",UserSchema);

let a = {
    name:"Gasdgor",age:21
}
run(a)

async function run(obj){
    // Запись
    // const User = new user(obj);
    // let element = await User.save();

    // Поиск
    // const User = await user.find({name:'Gasdgor'})

    
    console.log(User)
}


index()
async function index(){
    
}


// connection to the bot
const token = "5399828319:AAHpmWloq3uH4u3qavvEbprbh2Tw4ufqrbg";
const bot = new Telegraf(token);

bot.start((ctx)=> main(ctx));
bot.launch();

async function main (arg){
    let db = await fs.readFile('DataBase.json', 'utf8');
    try {
        db = JSON.parse(db);
    }catch(err){
        
    }
    if(!db){

    }
    console.log(arg.message.from.id, db)
    arg.reply("hi")
}

class NewUser {
    constructor() { 

    }
  
}