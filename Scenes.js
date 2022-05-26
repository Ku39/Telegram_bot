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

    NewNote.enter((ctx)=> ctx.reply("Напишите заметку", Markup.keyboard(["Назад"]).resize()));

    NewNote.hears("Назад", ctx => {
        ctx.scene.enter('firstScenes');
    });

    NewNote.on("message", async ctx =>{
        ctx.reply(`Заметка "${ctx.message.text}" Добавлена`);
        ctx.scene.enter('firstScenes');
        // if(msg.length == 0){
        //     msg = msg + ctx.message.text;
        // }else{
        //     msg = msg + " " + ctx.message.text
        // }
        
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