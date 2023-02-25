const product = require("./schema")

const getAllProducts = async(req,res)=>{
    let {name, featured, rating, company, sort, fields, limit, filter} = req.query
    let reqObj= {}
    if(name){
        reqObj.name= {$regex: name, $options : 'i'}
        //console.log(reqObj)
    }
    if(featured){
        reqObj.featured=featured
    }
    if(rating){
        reqObj.rating = rating
    }
    if(company){
        reqObj.company =  company
    }
    let products = product.find(reqObj)
    console.log(req.query)
    if(sort){
        let list = sort.split(',').join(' ')
        products =  products.sort(list)
    }
    else{
        products =  products.sort('createdAt')
    }
    if(fields){
        let askedList = fields.split(',').join(' ')
        products =  products.select(askedList)
    }
    if(limit){
        products = products.limit(Number(limit));
    }
    if(filter){
        console.log(filter)
        let reqsObj={}
            let newFilter = []
               for(let i=0;i<filter.length;i++){
                    if((filter[i]==='>'&&i!=filter.length-1) && (filter[i+1]==='=')){
                        newFilter.push("-$gte-");
                        i++;
                    }
                    else if(filter[i]==='>'){
                        newFilter.push("-$gt-");
                    }
                    else if((filter[i]==='<'&&i!=filter.length-1)  && filter[i+1]==='='){
                        newFilter.push("-$lse-");i++;
                    }
                    else if(filter[i]==='<'){
                        newFilter.push("-$ls-");
                    }
                    else if(filter[i]==='='){
                        newFilter.push("-$eq-")
                    }
                    else{
                        newFilter.push(filter[i])
                    }
               }
            newFilter = newFilter.join("")
            let filterables = ['price', 'rating']
            newFilter = newFilter.split(",")
            console.log("New filtered", newFilter)
            for(let i=0;i<newFilter.length;i++){
                let b= newFilter[i];
                b=b.split('-')
                let p=b[0];let op = b[1];let val = b[2]
                if(filterables.includes(p)){
                    reqsObj[p] = {[op]: val}
                }
                console.log(b)
            }
            console.log(reqsObj)
            products =  product.find(reqsObj)
            products = await products.sort({price: 1, rating: -1})
            return res.status(200).json(products)
    }
    let result = await products
    return res.status(200).json({result})
}
module.exports = {getAllProducts}