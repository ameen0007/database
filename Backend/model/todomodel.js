const mongoose = require("mongoose")

const todoschema = mongoose.Schema({
    todos : String , 
    status : Boolean
})

module.exports = mongoose.model("Todo",todoschema)