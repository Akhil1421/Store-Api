const items = ["chair", "sofa set", "bed", "suede armchair", "shelf", "table", "plywood", "window panes"]
const companies = ['ikea', 'liddy', 'caressa', 'marcos']

let iterator = 0;
let prices = {
    "chair" : 50,
    "sofa set" : 129,
    "bed" : 300,
    "suede armchair" : 60,
    "shelf" : 100,
    "table" : 110,
    "plywood" : 340,
    "window panes" : 120
}
let data = []

for(iterator=0;iterator<400;iterator++){
    const rating = Math.floor(Math.random()*5)
    let it = Math.floor(Math.random()*(items.length))
    prices[items[it]]+=1.5;
    let featuredVal = (Math.floor(Math.random()*5) ===0)? true : false
    let product = {
        name : items[it], 
        company : companies[Math.floor(Math.random()*4)],
        price : prices[items[it]],
        rating : rating ,
        featured : featuredVal
    }
    data.push(product)
}
// data.forEach(element => {
//     console.log(element)
// });

module.exports = {data}