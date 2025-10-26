

import { useState, useEffect } from "react";
import { FaInfoCircle, FaInfo, FaStar, FaHeart, FaCartArrowDown } from "react-icons/fa";
import { useTheme } from "../useTheme";
import { themeColors } from "../themes";
import ModalProductCard from './ModalProductCard';


const Home = ({ savedList, onSave, removeItemFunc, cartItemList, handleSaveCartFunc,removeCartItemFunc }) => {
  const { theme } = useTheme();
  const colors = themeColors[theme];

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // modal এর জন্য state
  const [showModal, setShowModal] = useState(false);

  const onLoveButtonClick = (item) => {
    const isSaved = savedList.some((saved) => saved.id === item.id);
    if (isSaved) {
      removeItemFunc(item.id);
    } else {
      onSave(item);
    }
  };

  const checkItemInCart = (product) =>{
    return cartItemList.some(item => item.id === product.id);
  }

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => setSelectedItem(null), 300); // smooth fade effect
  };

  const onCartButtonClick = (item) => {
    handleItemClick(item);
  };

  const getStartCount = (rate) => {
    let fillStars =parseInt(rate);

    let starList = [];

    for (let i=0; i<5; i++) {
      if (i < fillStars) {
        starList.push(<FaStar key={i} size={18} className="text-warning" />);
      } else {
        starList.push(<FaStar key={i} size={18} className="text-secondary" />);
      }
    }
    return starList ; 

  }

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        const uniqueCategories = ["All", ...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-3">Loading products...</p>;

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ background:colors.backgroundHome, minHeight: "100vh", paddingTop: "80px" }}>
      {/* Category Bar */}
      <div
        className="scroll-x"
        style={{
          position: "fixed",
          top: "55px",
          left: 0,
          right: 0,
          background: colors.scrollBarBg,
          zIndex: 1000,
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "15px",
          display: "flex",
          gap: "10px",
          
        }}
      >
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`btn ${
              selectedCategory === cat ? colors.catSelected : colors.catUnselected
            } mbtm-lg `}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="row lg-padtop gap-3 px-0">
        {filteredProducts.map((item) => (
          <div
            key={item.id}
            className={`col-12 col-md-5 col-lg-3 py-3 px-4 border ${colors.productBorder} rounded `}
            style={{ background: colors.cardBg }}
          >
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                
                <div className={`badge ${colors.badgeBg} ${colors.badgeText}`}>
                  {item.category}
                </div>
              </div>

              <div
                className={`btn px-2 py-1 rounded ${
                  savedList.some((saved) => saved.id === item.id)
                    ? colors.iconActive
                    : colors.iconDefault
                }`}
                onClick={() => onLoveButtonClick(item)}
              >
                <FaHeart size={28} />
              </div>
            </div>

            <div className="d-flex justify-content-start align-items-start mb-2 me-3">
              <img
                src={item.image}
                alt={item.title}
                style={{ height: "100px", width: "100px", objectFit: "contain" }}
              />

              <div className="d-flex flex-column ms-5 ">
                <span className="bg-info badge nav-item-text">overview</span>
                <div className={` d-flex justify-content-start align-items-center fw-bold fs-5 text-info`}>
                  <span className="badge bg-info me-2" style={{ fontSize:9 }}>Price</span>
                  <span>${item.price}</span>
                  <span className="fst-italic fs-6 text-danger ps-2"><strike>${item.price*2+45.6} </strike></span>
                </div>

                <div className="d-flex flex-column ">

                  <span className="p-0">
                   
                    <div className="d-flex align-items-center ">
                      <span className="badge bg-info me-2" style={{ fontSize:9 }}>Review(s)</span>
                       <span className='me-1 fw-bold'>{item.rating.rate}</span> 
                       { getStartCount(item.rating.rate) }
                    </div>
                   
                  </span>
                   
                  <span className="p-0 text-warning "> ({item.rating.count} reviews) </span>

                  { checkItemInCart (item) ?
                    <p className="badge bg-danger mt-1"> <FaCartArrowDown size={12}/> Item Already In Cart </p> : <></>
                  }
                  
                </div>

               
              </div>
            </div>

            {/* <p className={`small ${colors.textMuted}`}>{item.description.slice(0, 100)}...</p> */}
            
            
            <h6 className={`${colors.textSecondary} fs-6 py-4`}>{item.title}</h6>

            <div className="d-flex">

                <button className={`btn btn-sm ${colors.btnPrimary} ${colors.btnText} flex-grow-1`} 
                        onClick={()=>onCartButtonClick(item)}>
                    <FaInfoCircle className="mb-1" size={18} /> 
                    <span className="ps-1">Details</span>
                </button>  
            </div>
            
          </div>
        ))}

         {showModal && selectedItem && (
            <ModalProductCard
               handleClose = {handleClose}
               selectedItem = {selectedItem}
               colors = {colors}
               handleSaveCartItem={handleSaveCartFunc}
               cartItemList={cartItemList}
               removeCartItemFunc = {removeCartItemFunc}
            />
          )}

      </div>
    </div>

    
  );
};




export default Home;
