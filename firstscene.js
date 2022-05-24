'use strict'
const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



module.exports = function(){
    const firstScenes = new BaseScene('firstScenes');
    firstScenes.enter((ctx)=> ctx.reply("Выбери действие",Markup.keyboard([
        ["Новая заметка","Все заметки"]
    ]).resize()));
    firstScenes.on("message", async ctx=>{
        if(ctx.message.text == "Новая заметка"){
            Statist(ctx);
        }else if(ctx.message.text == "Все заметки"){
            starts(ctx);
        }
    })
    return firstScenes
}
