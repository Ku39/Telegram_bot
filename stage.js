'use strict';

const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');

module.exports = function(){
    const stage = new Stage();
    
    const first = require('./firstscene');

    stage.register(first())
    stage.hears('exit', ctx => ctx.scene.leave())
    return stage.middleware();
}