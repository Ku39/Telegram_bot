'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:"String",
    first_name:"String",
    last_name:"String",
    username:"String",
    notes:"Array"
});

const Model = mongoose.model("User",UserSchema);

module.exports = Model;