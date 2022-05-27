'use strict'
const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const NewUser = require("./UserShema");



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

    NewNote.enter((ctx)=> ctx.reply("Напишите заметку", Markup.keyboard(["Назад"]).resize()));

    NewNote.hears("Назад", ctx => {
        ctx.scene.enter('firstScenes');
    });

    NewNote.on("message", async ctx =>{
        const identifikator = `${ctx.update.message.from.id}`;
        let user = await NewUser.find({id:identifikator});
        let YNotes = user[0].notes;
        const msg = await String(ctx.message.text);
        YNotes.push(msg);
        const upd = await NewUser.updateOne({id:identifikator},{notes:YNotes});
        ctx.reply(`Заметка "${ctx.message.text}" Добавлена`);
        ctx.scene.enter('firstScenes');
    });

    return NewNote
}

module.exports.NewNote = function(){
    const NewNote = new BaseScene('NewNote');
}