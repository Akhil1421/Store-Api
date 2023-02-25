require("dotenv").config()
require("express-async-errors")
const express = require("express")
const {genErrorHandler, specErrorHandler} = require("./errorHandlers")
const connectDatabase = require("./connectDb")
const {routes} = require("./routes")
const app = express()

//middlewares
app.use(express.json())
//routes
app.get("/", (req,res)=>{
    res.send('<h1>Store Api</h1><a href="/api/v1/products">Products Route</a>')
})
app.use('/api/v1/products', routes)
app.use([genErrorHandler, specErrorHandler])
//port
const port = process.env.PORT || 5000

const begin = async()=>{
    try {
        await connectDatabase(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening at ${port}....`))
    } catch (error) {
        console.log(error)   
    }
}

begin()