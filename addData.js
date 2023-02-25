require('dotenv').config()

const connectDatabase = require("./connectDb")
const schema = require("./schema")
const {data} = require("./data")

const start = async ()=>{
    try {
        await connectDatabase(process.env.MONGO_URI)
        await schema.deleteMany();
        await schema.create(data)
        console.log("Connected")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
start()