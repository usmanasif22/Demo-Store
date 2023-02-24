const pool = require("../../databasepg");
const query = require("../queries/productQuery");
let store;
exports.get_all = (req,res,next)=>{
  const { page,sortby,keyword,moq,minPrice,maxPrice,subcategory,category,country,certificate,inUsa,supplier} = req.query;
  var countryValues = country.split(',')
  var countries; 
  if(countryValues[0]==='')
    countries=null
  else
    countries=countryValues


  var certificateValues = certificate.split(',')
  var certificates;
  if(certificateValues[0]==='')
    certificates=null
  else
    certificates=certificateValues 
    
 
  var supplierValues = supplier.split(',')
  var supplierCertificates;
  if(supplierValues[0]==='')
    supplierCertificates=null
  else
    supplierCertificates=supplierValues

  var bool;
  if(inUsa=='true')
    bool = true;
  else
    bool = null

  pool.query(query.get_all,
  [`%${keyword}%`, parseInt(moq)||null ,parseInt(minPrice)||null,parseInt(maxPrice)||null,`%${subcategory}%`,countries,certificates,bool,`%${category}%`,supplierCertificates],
  (error,result)=>{
      if(error){
        res.status(500).json({
          message: error.message,
          name: error.name    
        })
        console.log(error.name,error.name)
      }
      else{
        const data = result.rows;
      store = {
        total: data.length,
        products: data
      }
      if (sortby) {
        console.log("im sortby",sortby)
        if (sortby === "Relevance") {
          const sortId = (a, b) => {
            return a.id - b.id;
          };
          store.products = store.products.slice().sort(sortId);
        } else if (sortby === "Price Low to High") {
          const sortLTH = (a, b) => {
            return a.price - b.price;
          };
          store.products = store.products.slice().sort(sortLTH);
        } else if (sortby === "Price High to Low") {
          const sortHTL = (a, b) => {
            return b.price - a.price;
          };
          store.products = store.products.slice().sort(sortHTL);
        } else if (sortby === "MOQ Low to High") {
          const sortMOQ = (a, b) => {
            return a.moq - b.moq;
          };
          store.products = store.products.slice().sort(sortMOQ);
        } else if (sortby === "Rating High to Low") {
          const sortRating = (a, b) => {
            return b.rating - a.rating;
          };
          store.products = store.products.slice().sort(sortRating);
        }
      }
      if (page) {
        const startIndex = (page - 1) * 9;
        store.products = store.products.slice(startIndex, startIndex + 9)
      }
      res.status(200).json(store);
      }
     })  
}