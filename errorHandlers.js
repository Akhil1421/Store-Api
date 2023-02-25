const genErrorHandler = async(error,req,res,next)=>{
    return res.status(500).json({msg:"Something went wrong"})
}

const specErrorHandler = async(req,res)=>{
    return res.status(404).json({msg:"No such data found"})
}

module.exports = {genErrorHandler, specErrorHandler}
