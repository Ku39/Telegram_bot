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
            ctx.scene.enter('NewNote');
        }else if(ctx.message.text == "Все заметки"){
            ctx.scene.enter('AllNotes')
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

module.exports.AllNotes = function(){
    const AllNotes = new BaseScene('AllNotes');
    AllNotes.enter( async ctx => {
        const identifikator = `${ctx.update.message.from.id}`;
        let user = await NewUser.find({id:identifikator});
        let Notes = user[0].notes
        Notes.forEach(async item => {
            await ctx.reply(item[0],{
                reply_markup:{
                    inline_keyboard:[
                        [
                            {text:"Удалить", callback_data: "delete"},
                            {text:"Изменить", callback_data: "change"}
                        ]
                    ]
                }
            })
        });
        let repl = await ctx.reply(".",Markup.keyboard(["Назад"]).resize());
        let msgid = repl.message_id;
        await ctx.deleteMessage(msgid, ctx.chat.id);
    })
    AllNotes.on("message",async ctx => {
        if(ctx.message.text == "Назад"){
            ctx.scene.enter('firstScenes')
        }
    })

    AllNotes.action("delete", async ctx => {
        let user = await NewUser.find({id:String(ctx.from.id)});
        // console.log(user)
        let arr = user[0].notes;
        // console.log(arr)
        arr.forEach((item, i) => {
            console.log(item[0],ctx)
            if (String(item[0])==String(ctx.update.callback_query.message.text)){
                arr.splice(i,1)
                delete arr[i];
            }
        })
        console.log(arr)
        ctx.deleteMessage(ctx.message_id, ctx.chat.id);
    })

    AllNotes.action("change", ctx => {
        console.log(ctx.update.callback_query)
    })
    return AllNotes
}