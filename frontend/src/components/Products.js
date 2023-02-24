import { useEffect, useState } from "react";
import Banner from "./Banner";
import Sidebar from "./SideBar";
import Header from "./Header";
import { useSelector, useDispatch } from 'react-redux';
import {setProducts} from '../redux/productSlice';

const Products = () => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch()

  const [page,setPage] = useState(1);
  const [totalProducts,setTotalProducts]=useState(0) ;
  const [selectFilter,setSelectFilter]=useState('');
  const [moq,setMoq] = useState('');
  const [minPrice,setMinPrice] = useState('');
  const [maxPrice,setMaxPrice] = useState('');
  const [keyword,setKeyword] = useState('');
  const [category,setCategory] = useState('');
  const [mainCategory,setMainCategory] = useState('');
  const [country,setCountry] = useState('');
  const [cerificate,setCertificates] = useState('');
  const [supplierCerificates,setSupplierCertificates] = useState('');
  const [inUsa,setInUsa] = useState('');

  const totalPages = Math.ceil(totalProducts/9);

  var countries;
  var certificates;
  var suppliers;

  if(country.length>0){
    countries = country.join(',')
  }
  else{
    countries = country
  } 

  if(cerificate.length>0){
    certificates = cerificate.join(',')
  }
  else{
    certificates = cerificate
  } 

  if(supplierCerificates.length>0){
    suppliers = supplierCerificates.join(',')
  }
  else{
    suppliers = supplierCerificates
  }
  
  const url = `http://localhost:8000/products/?page=${page}&sortby=${selectFilter}&subcategory=${category}&keyword=${keyword}&moq=${moq}&minPrice=${minPrice}&maxPrice=${maxPrice}&country=${countries}&certificate=${certificates}&supplier=${suppliers}&inUsa=${inUsa}&category=${mainCategory}`

  const fetchProducts = async () => {
  await fetch(url)
      .then(async (result) => {
        const products = await result.json();
        
         setTotalProducts(products.total) ;
        dispatch(setProducts(products.products));
      })
      .catch((err) => console.log(err));
  };
  useEffect(()=>{
    setPage(1)
  },[minPrice,maxPrice,moq,keyword,country,category])
  useEffect(() => {
    fetchProducts();
  }, [url]);


  return (
    <div className="product-container">
        <Header keyword={keyword} setKeyword={setKeyword} setCategory={setCategory} setMainCategory={setMainCategory}/>
      <Banner productCount={totalProducts} totalPages={totalPages} page={page} setPage={setPage} setTotalProducts={setTotalProducts} setSelectFilter={setSelectFilter} selectFilter={selectFilter}/>
      {
          totalProducts === 0 && <div id="loading">No Products Found</div>
      }
      {
          totalProducts > 0 && <div> 
      <div className="products-data">
        {products.map((doc) => (
          <div key={doc.id} className="product-box" >
            <div className="product-image">
              <img src={doc.images[0]} alt="productImage" />
            </div>
            <div className="product-in-usa">
              {doc.stockinusa && (
                <div>
                  <img
                    id="flagofUSA1"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
                    alt="USA Flag"
                  ></img>
                  <label style={{ marginLeft: "10px" }}>Stock In USA</label>
                </div>
              )}
            </div>

            <div className="product-desc">
              <p className="product-name">{doc.name}</p>
              <p className="product-moq">MOQ: <span style={{marginLeft:"3px",color:"#828385"}}>{doc.moq}</span><span style={{marginLeft:"5px",color:"#828385"}}>{doc.unit}s</span></p>
              <h3><span style={{marginRight:"3px"}}>$</span>{doc.price.toFixed(2)}<span style={{marginLeft:"3px"}}>/<span style={{marginLeft:"3px"}}>{doc.unit}</span></span></h3>
                <button className="addToCart">Add to Cart</button>
            </div>
          </div>
        ))}
        {
            products.length>0 && <div className="page-buttons2">
            <div className="back" onClick={()=>{if(page>1&&page<=totalPages)setPage(page-1)}}><img src="https://thebuyhive.com/buy/img/chevronLeft.c50c4a36.svg" alt="" /></div>
            <div className="page-no">{page}</div>
            <div className="total-pages">{`of ${totalPages}`}</div>
            <div className="forward" onClick={()=>{if(page>0&&page<totalPages)setPage(page+1)}}><img src="https://thebuyhive.com/buy/img/chevronRight.b3ce29d8.svg" alt="" /></div>
        </div>
        }
      </div>
      
          </div>
      }
      <Sidebar setInUsa={setInUsa} setMoq={setMoq} setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} setCountry={setCountry} country={country} setCertificates={setCertificates} setSupplierCertificates={setSupplierCertificates}/>
    </div>
  );
};
export default Products;
