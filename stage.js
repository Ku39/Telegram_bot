'use strict';

const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');

module.exports = function(){
    const stage = new Stage();
    
    const Scenes = require('./Scenes');
    const first = Scenes.first
    const NewNote = Scenes.NewNote

    stage.register(first());
    stage.register(NewNote());
    stage.hears('exit', ctx => ctx.scene.leave())
    return stage.middleware();
}