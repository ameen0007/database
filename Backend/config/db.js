const mongoose = require("mongoose")

const connectdb = async ()=>{
  const {connection} =  await mongoose.connect(process.env.Mongo_Uri)
console.log("database is connected"+ connection.host);
    
}
module.exports = connectdb