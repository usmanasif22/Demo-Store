import { useEffect, useState } from "react";
import boxMenu from "../images/boxMenu.png";
import Subcategories from "./Subcategories";

const Header = (props) => {
  const{setKeyword,setCategory,setMainCategory}=props;
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [input,setInput]=useState('');
  const [selectedCategory,setSelectedCategory]=useState('');

  const fetchCategories = async () => {
    await fetch("http://localhost:8000/categories/list")
      .then(async (result) => {
        const data = await result.json();
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openCategories = async () => {
    await fetch("http://localhost:8000/categories")
      .then(async (result) => {
        const data = await result.json();
        setSubCategories(data);
        setOpen(!open);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(()=>{
    if(selectedCategory){
      setCategory(selectedCategory)
    }else{
      setCategory(selectedCategory)
    }
  },[selectedCategory])

  const handleSubmit = () => {
    var e = document.getElementById("selectCategory")
    var text = e.options[e.selectedIndex].text;
    if(text!=="All Categories"){
      setMainCategory(text);
    }
    else if(text==="All Categories"){
      setMainCategory('')
    }
    if(input){
      setKeyword(input);
    }
    else{
      setKeyword(input)
    } 
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <div className="header">
        <button onClick={openCategories} className="categories">
          <img src={boxMenu} alt="menu" />
          <span>Categories</span>
        </button>
        <div className="search">
          <input type="text" placeholder="What are you looking for?" onChange={(e)=>{setInput(e.target.value)}}/>
          <select id="selectCategory" >
            <option>All Categories</option>
            {categories.map((doc) => (
              <option key={doc.id}>{doc.name}</option>
            ))}
          </select>
        </div>
        <button id="search-button" onClick={handleSubmit}>Search</button>
      </div>
      {open && <Subcategories data={subcategories} setSelectedCategory={setSelectedCategory} setMainCategory={setMainCategory}></Subcategories>}
    </div>
  );
};

export default Header;
