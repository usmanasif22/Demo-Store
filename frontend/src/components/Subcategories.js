const Subcategories = (props) => {
  const data = [...props.data];
  const {setSelectedCategory,setMainCategory}=props;
  return (
    <div className="dropdown-container" >
      {data.map((item) => (
        <div className="dropdown-category-list" key={item.id} onClick={()=>setMainCategory(item.name)}>
          {item.name}
          {/* subcategories */}
          <div className="subcategoriesConatiner">
            {item.subcategories.map((doc) => (
              <div className="subcategory-list" key={doc.id} onClick={()=>setSelectedCategory(doc.name)}>
                {doc.name}
              </div>
            ))}
          </div>
        </div>
      ))}
      <br />
    </div>
  );
};

export default Subcategories;
