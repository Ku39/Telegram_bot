'use strict';

const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');

module.exports = function(){
    const stage = new Stage();
    
    const Scenes = require('./Scenes');
    const first = Scenes.first
    const NewNote = Scenes.NewNote
    const AllNotes = Scenes.AllNotes

    stage.register(first());
    stage.register(NewNote());
    stage.register(AllNotes());
    stage.hears('exit', ctx => ctx.scene.leave())
    return stage.middleware();
}