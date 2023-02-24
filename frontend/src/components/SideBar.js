import { useEffect, useState } from "react";

const Sidebar = (props) => {
  const { setMoq, setMinPrice, setMaxPrice, setCountry, setCertificates,setInUsa,setSupplierCertificates } = props;

  const [showProductCount, setProductShowCount] = useState(6);
  const [showSuppilerCount, setSupplierShowCount] = useState(6);
  const [showCountryCount, setCountryShowCount] = useState(6);
  //Filters
  const [moqInput, setMoqInput] = useState("");
  const [minPriceInput, setMinPriceInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [countryCheckbox, setcountryCheckbox] = useState([]);
  const [certificateCheckbox, setCertificateCheckbox] = useState([]);
  const [supplierCheckbox, setSupplierCheckbox] = useState([]);
  const [inUsaCheckbox, setInUsaCheckbox] = useState(false);
  //Checkboxes Lits
  const [productCertificatesText, setProductCertificatesText] = useState('');

  const productCertifications = [
    "ASTM",
    "CE",
    "Certificate of Compliance",
    "Certificate of Conformity",
    "EN",
    "EPA",
    "FCC",
    "FDA",
    "GB",
    "Green Clean Certificate",
    "Intertek",
    "ISO 11439:2000",
    "ISO 11439:2013",
    "ROHS",
    "SGS",
  ];
  const supplierCertifications = [
    "DUNS",
    "DRS",
    "GMP",
    "ISO 13485",
    "ISO 9001",
    "ISO 9001:2015",
  ];
  const countries = [
    "Australia",
    "Canada",
    "China",
    "Hong Kong",
    "India",
    "Korea",
    "United Kingdom",
    "United States",
    "Vitenam",
  ];


  const handleCountryChange = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setcountryCheckbox([...countryCheckbox, checkboxValue]);
    } else {
      setcountryCheckbox(countryCheckbox.filter((value) => value !== checkboxValue));
    }
  }; 
  const handleCertificateChange = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setCertificateCheckbox([...certificateCheckbox, checkboxValue]);
    } else {
      setCertificateCheckbox(certificateCheckbox.filter((value) => value !== checkboxValue));
    }
  };
  const handleSupplierChange = (event) => {
    const checkboxValue = event.target.value;
    if (event.target.checked) {
      setSupplierCheckbox([...supplierCheckbox, checkboxValue]);
    } else {
      setSupplierCheckbox(supplierCheckbox.filter((value) => value !== checkboxValue));
    }
  };

  useEffect(() => {
    if (moqInput) {
      setMoq(moqInput);
    } else {
      setMoq(moqInput);
    }

    if (minPriceInput) {
      setMinPrice(minPriceInput);
    } else {
      setMinPrice(minPriceInput);
    }

    if (maxPriceInput) {
      setMaxPrice(maxPriceInput);
    } else {
      setMaxPrice(maxPriceInput);
    }

    if (countryCheckbox.length>0) {
      setCountry(countryCheckbox)
    } 
    else if(countryCheckbox.length<1){
      setCountry('');
    }

    if (certificateCheckbox.length>0) {
      setCertificates(certificateCheckbox)
    } 
    else if(certificateCheckbox.length<1){
      setCertificates('');
    }
    
    if (supplierCheckbox.length>0) {
      setSupplierCertificates(supplierCheckbox)
    } 
    else if(supplierCheckbox.length<1){
     
      setSupplierCertificates('');
    }
    
    if (inUsaCheckbox) {
      setInUsa(true)
    } 
    else if(!inUsaCheckbox){
      setInUsa('');
    }
  }, [moqInput, minPriceInput, maxPriceInput,countryCheckbox,certificateCheckbox,inUsaCheckbox,supplierCheckbox]);

  const handleProductsCerificationShowMore = () => {
    setProductShowCount(productCertifications.length);
  };
  const handleProductsCerificationShowLess = () => {
    setProductShowCount(6);
  };
  const handleSupplierCerificationShowMore = () => {
    setSupplierShowCount(supplierCertifications.length);
  };
  const handleSupplierCerificationShowLess = () => {
    setSupplierShowCount(6);
  };
  const handleCountryShowMore = () => {
    setCountryShowCount(countries.length);
  };
  const handleCountryShowLess = () => {
    setCountryShowCount(6);
  };
  return (
    <div className="side-bar">
      <h4>Price</h4>
      <input
        className="price-filter"
        type="number"
        placeholder="from"
        onChange={(e) => setMinPriceInput(e.target.value)}
      />
      <span id="d1">$</span>
      <span id="range">
        <hr />
      </span>
      <input
        className="price-filter"
        type="number"
        placeholder="to"
        onChange={(e) => setMaxPriceInput(e.target.value)}
      />
      <span id="d2">$</span>

      <h4>MOQ</h4>
      <input
        className="moq-filter"
        type="number"
        placeholder="less than"
        onChange={(e) => {
          setMoqInput(e.target.value);
        }}
      />
      <div className="product-certification">
        <h4>Product Certification</h4>
        <input
          className="certification-filter"
          type="text"
          placeholder="Product Certification..."
          onChange={setProductCertificatesText}
        />
        <br />
        {productCertifications.slice(0, showProductCount).map((doc, i) => (
          <div className="certification-list" key={i}>
            <input type="checkbox" id="" value={doc} onChange={handleCertificateChange}/>
            <label>{doc}</label>
          </div>
        ))}
        {showProductCount < productCertifications.length && (
          <div>
            <p
              className="expand-certification"
              onClick={handleProductsCerificationShowMore}
            >
              Show All
            </p>
            <span
              className="expand-certification-span"
              onClick={handleProductsCerificationShowMore}
            >
              {productCertifications.length}
            </span>
          </div>
        )}
        {showProductCount === productCertifications.length &&
          productCertifications.length !== 6 && (
            <p
              className="expand-certification"
              onClick={handleProductsCerificationShowLess}
            >
              Show less
            </p>
          )}
      </div>
      <br />
      <div className="supplier-certification">
        <h4>Supplier Certification</h4>
        <input
          className="certification-filter"
          type="text"
          placeholder="Supplier Certification..."
        />
        {supplierCertifications.slice(0, showSuppilerCount).map((doc, i) => (
          <div className="certification-list" key={i}>
            <input type="checkbox" id="" value={doc} onChange={handleSupplierChange}/>
            <label>{doc}</label>
          </div>
        ))}
        {showSuppilerCount < supplierCertifications.length &&
          supplierCertifications.length !== 6 && (
            <div>
              <p
                className="expand-certification"
                onClick={handleSupplierCerificationShowMore}
              >
                Show All
              </p>
              <span
                className="expand-certification-span"
                onClick={handleSupplierCerificationShowMore}
              >
                {supplierCertifications.length}
              </span>
            </div>
          )}
        {showSuppilerCount === supplierCertifications.length &&
          supplierCertifications.length !== 6 && (
            <p
              className="expand-certification"
              onClick={handleSupplierCerificationShowLess}
            >
              Show less
            </p>
          )}
      </div>
      <br />

      <div className="country">
        <h4>Manufacturer Location</h4>
        <input
          className="certification-filter"
          type="text"
          placeholder="Country/Region"
        />
        {countries.slice(0, showCountryCount).map((doc, i) => (
          <div className="certification-list" key={i}>
            <input
              type="checkbox"
              id="countryCheckbox"
              value={doc}
              onChange={handleCountryChange}
            />
            <label>{doc}</label>
          </div>
        ))}
        {showCountryCount < countries.length && countries.length !== 6 && (
          <div>
            <p className="expand-certification" onClick={handleCountryShowMore}>
              Show All
            </p>
            <span
              className="expand-certification-span"
              onClick={handleCountryShowMore}
            >
              {countries.length}
            </span>
          </div>
        )}
        {showCountryCount === countries.length && countries.length !== 6 && (
          <p className="expand-certification" onClick={handleCountryShowLess}>
            Show less
          </p>
        )}
      </div>
      <br />

      <div className="avail-in-USA">
        <h4>Stock Availability</h4>
        <input type="checkbox" id="" value="" onChange={()=>setInUsaCheckbox(!inUsaCheckbox)}/>
        <img
          id="flagofUSA"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
          alt="USA Flag"
        ></img>
        <label style={{ marginLeft: "10px" }}>In USA</label>
      </div>
    </div>
  );
};

export default Sidebar;
