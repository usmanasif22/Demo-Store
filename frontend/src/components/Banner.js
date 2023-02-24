import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {setProducts} from '../redux/productSlice';

const Banner = (props) => {
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch()

  const {productCount,page,totalPages,setPage,setTotalProducts,setSelectFilter,selectFilter} = props;
  const [item, setItem] = useState("Products");
  const [showSelectFilters, setShowSelectFilters] = useState(false);
  var selectValue = selectFilter
  if(!selectFilter){selectValue ="Latest"}
  return (
    <div className="products-details">
      <div className="products-count">
        <h3>{item}</h3>
        <p>{productCount} Products</p>
      </div>
      <div className="products-path">
        <p>Buy</p>
      </div>
      <div className="banner">
        <p style={{ color: "#ffffff" }}>
          Placing bulk orders on BuyHive is safe & easy.
        </p>
        <h4 style={{ color: "#ffffff" }}>Click to learn how it works!</h4>
      </div>
      <div className="select-controls" onMouseEnter={()=>setShowSelectFilters(true)} onMouseLeave={()=>setShowSelectFilters(false)}>
        <input  id="select-filters"value={selectValue} onChange={(e)=>setSelectFilter(e.target.value)}/>
        <span>
            <img
              id="filters-dropdown"
              src="https://thebuyhive.com/buy/img/chevronDown.e08abe09.svg"
              alt=""
            />
          </span>
        {
            showSelectFilters && 
            <div className="select-filters-dropdown">
                 <ul  >
                <li onClick={()=>setSelectFilter("Relevance")}>Relevance</li>
                <li onClick={()=>setSelectFilter("Latest")}>Latest</li>
                <li onClick={()=>setSelectFilter("Price Low to High")}>Price Low to High</li>
                <li onClick={()=>setSelectFilter("Price High to Low")}>Price High to Low</li>
                <li onClick={()=>setSelectFilter("MOQ Low to High")}>MOQ Low to High</li>
                <li onClick={()=>setSelectFilter("Rating High to Low")}>Rating High to Low</li>
            </ul>
            </div>
        }
      </div>
      <div className="page-buttons">
            <div className="back" onClick={()=>{if(page>1&&page<=totalPages)setPage(page-1)}}><img src="https://thebuyhive.com/buy/img/chevronLeft.c50c4a36.svg" alt="" /></div>
            <div className="page-no">{page}</div>
            <div className="total-pages">{`of ${totalPages}`}</div>
            <div className="forward" onClick={()=>{if(page>0&&page<totalPages)setPage(page+1)}}><img src="https://thebuyhive.com/buy/img/chevronRight.b3ce29d8.svg" alt="" /></div>
        </div>
    </div>
  );
};

export default Banner;
