'use strict'
const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



module.exports.first = function(){
    const firstScenes = new BaseScene('firstScenes');
    firstScenes.enter((ctx)=> ctx.reply("Выбери действие",Markup.keyboard([
        ["Новая заметка","Все заметки"]
    ]).resize()));
    firstScenes.on("message", async ctx=>{
        if(ctx.message.text == "Новая заметка"){
            ctx.scene.enter('NewNote')
        }else if(ctx.message.text == "Все заметки"){
            starts(ctx);
        }else{
            ctx.reply('Извини, но у меня нет такой команды')
        }
    })
    return firstScenes
}

module.exports.NewNote = function(){
    const NewNote = new BaseScene('NewNote');
    NewNote.enter((ctx)=> ctx.reply("Напишите заметку"/* , Markup.keyboard([
        ["Добавить","Назад"]
    ]).resize() */));
    NewNote.on("message", async ctx =>{
        
    })
    return NewNote
}

// module.exports.NewNote2 = function(){
//     const NewNote2 = new BaseScene('NewNote2');
//     NewNote2.enter((ctx)=> ctx.reply("Добавить заметку", Markup.keyboard([
//         ["Добавить","Назад"]
//     ]).resize()));
// }