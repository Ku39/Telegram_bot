'use strict';

const { Telegraf, session, Scenes:{BaseScene, Stage}, Markup } = require('telegraf');

module.exports = function(messages, db){
    const stage = new Stage()
    stage.command('cancel', Stage.leave())
    
    const first = require('./firstscene');

    stage.register(first())

    return stage.middleware();
}