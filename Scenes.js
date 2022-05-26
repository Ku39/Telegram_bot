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
    NewNote.enter((ctx)=> ctx.reply("Напишите заметку",Markup.keyboard([
        ["Добавить","Назад"]
    ]).resize()));

    NewNote.enter((ctx)=> ctx.reply("Напишите заметку", Markup.keyboard(["Добавить","Назад"]).resize()));

    let msg = "";
    
    NewNote.hears("Добавить", ctx => {
        ctx.reply(`Заметка "${msg}" Добавлена`);
        ctx.scene.enter('firstScenes');
    });

    NewNote.hears("Назад", ctx => {
        ctx.scene.enter('firstScenes');
    });

    NewNote.on("message", async ctx =>{
        if(msg.length == 0){
            msg = msg + ctx.message.text;
        }else{
            msg = msg + " " + ctx.message.text
        }
        
    });

    return NewNote
}

// module.exports.NewNote2 = function(){
//     const NewNote2 = new BaseScene('NewNote2');
//     NewNote2.enter((ctx)=> ctx.reply("Добавить заметку", Markup.keyboard([
//         ["Добавить","Назад"]
//     ]).resize()));
//     NewNote2.on("message", async ctx =>{
//         if(ctx.message.text == "Добавить заметку"){

//         }else if(){
            
//         }
//     })
// }