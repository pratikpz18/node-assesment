const mongoose = require('mongoose')

Mongo_Uri = "mongodb://localhost:27017/node";

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(Mongo_Uri,{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify:false
        })
        console.log("connected to db!")
    }catch(e){
        console.log(e);
        throw e;
    }
}

module.exports = InitiateMongoServer