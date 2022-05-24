// connect libraries
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
    console.log(ctx.update)
});
bot.launch();
