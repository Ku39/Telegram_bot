'use strict'

// used libraries
const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');
const axios = require('axios');
const fs = require("fs").promises;
const mongoose = require("mongoose");
const { appendFile } = require('fs');

const CONNECTION_URL = 'mongodb+srv://ku39:W810i104.@cluster0.k3pka.mongodb.net/?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

const connect = mongoose.connect(CONNECTION_URL);
connect.then(()=>console.log("connection"));
connect.catch((error)=>console.log(eroor));

console.log()
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