const mongoose = require("mongoose")

const connect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/RefineAi`)
        console.log("Mongo Server Started")
    }
    catch (err) {
        console.log("Failed to start Mongo Server",err)
    }
}

module.exports = connect;