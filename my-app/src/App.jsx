import './App.css'
import { useState } from "react";
import { FaHome, FaCog, FaShoppingCart, FaBookmark, FaSearch } from "react-icons/fa";
import Home from './components/Home';
import Save from './components/Save';
import Setting from './components/Setting';
import Cart from './components/Cart';


import {ThemeProvider} from "./ThemeContext";

import { useTheme } from "./useTheme";
import { themeColors } from "./themes";
import CartItemModel from './components/Models/CartItemModel'


const MainApp = () => {

  const { theme } = useTheme();
  const colors = themeColors[theme];

  const [crrTab, setCrrTab] = useState("Home");

  const [savedList, setSavedList] = useState([]);

  const [cartItemList, setCartItemList] = useState([]);
  
  const handleEmptyCart = () => {
    setCartItemList([]);
  }

  const handleRemoveItem = (itemId) => {
    setSavedList((prevList) => prevList.filter((p) => p.id !== itemId));
  };

  const handleRemoveCartItem = (itemId) => {
    setCartItemList((prevList) => prevList.filter((p) => p.id !== itemId));
  };

  const handleSaveCartItem = (item, count) => {
    setCartItemList((prevList) => {
      const existingItem = prevList.find((p) => p.cartItem.id === item.id);

      if (existingItem) {
        if (existingItem.numberOfItem === count) {
          return prevList;
        } else {
          return prevList.map((p) =>
            p.cartItem.id === item.id
              ? new CartItemModel(item, count)
              : p
          );
        }
      }

      return [...prevList, new CartItemModel(item, count)];
    });
  };


  const handleSaveItem = (item) => {
    setSavedList((prevList) => {
      // prevent duplicates
      if (prevList.find((p) => p.id === item.id)) return prevList;
      return [...prevList, item];
    });
  };

  const CartItemQuantityIncrease = (targetId) =>{

    setCartItemList(prevList =>
      prevList.map(item =>
        item.id === targetId
          ? Object.assign(Object.create(Object.getPrototypeOf(item)), item, { quantity: item.quantity+1 })
          : item
      )
    );
  }

  const CartItemQuantityDecrease = (targetId) =>{

    console.log('Tar id', targetId)

    const selectedCartItem = cartItemList.find(item => item.id === targetId);

    console.log('sl item ', selectedCartItem)


    if (selectedCartItem.quantity <= 1){
      handleRemoveCartItem(targetId);
      return
    }

    setCartItemList(prevList =>
      prevList.map(item =>
        item.id === targetId
          ? Object.assign(Object.create(Object.getPrototypeOf(item)), item, { quantity: item.quantity-1 })
          : item
      )
    );
  }

  const menuItems = [
    {name:"Home", icon:FaHome}, 
    {name:"Saved", icon:FaBookmark}, 
    {name:"Setting", icon:FaCog}, 
    {name:"Cart", icon:FaShoppingCart}, 
  ];

  const getCurrentComponent = () => {
    if (crrTab === "Home") return <Home savedList={savedList} 
                                        onSave={handleSaveItem} 
                                        removeItemFunc={handleRemoveItem}
                                        handleSaveCartFunc={handleSaveCartItem}
                                        cartItemList ={cartItemList}
                                        removeCartItemFunc = {handleRemoveCartItem}
                                        />;
    if (crrTab === "Saved") return <Save savedList={savedList} 
                                         onRemove={handleRemoveItem}
                                         removeItemFunc={handleRemoveItem}
                                         handleSaveCartFunc={handleSaveCartItem}
                                         cartItemList ={cartItemList}
                                         removeCartItemFunc = {handleRemoveCartItem}
                                        />;
    if (crrTab === "Setting") return <Setting />;
    if (crrTab === "Cart") return <Cart cartItemList={cartItemList} 
                                        handleEmptyCartFunc = {handleEmptyCart}
                                        removeCartItemHandler = {handleRemoveCartItem} 
                                        CartItemQuantityIncrease = {CartItemQuantityIncrease}
                                        CartItemQuantityDecrease = {CartItemQuantityDecrease}
                                        />;
    return <div>Other</div>;
  };

  const TopBar = () => {    
    return (
      <nav className={`${colors.topbarBg} fixed-top border-bottom ${colors.topbarBorder} shadow-sm`}>
        <div className='d-flex justify-content-between align-items-center p-1 px-2'>
          <div>
            <div className='p-1 fw-bold'>
              <span className='text-warning fs-1'>B</span>
              <span className='fs-4'>aazar</span>
            </div>
          </div>
          <div className='d-flex justify-content-between align-items-center'>
            <div className="input-group">
              <input type="text" className="form-control border border-secondary"
                     style={{
                         color: `${colors.inputTxtColor}`,
                         backgroundColor: `${colors.inputBg}`,                   
                     }}
                     defaultValue="Find what your desire..." />
              <span className={`input-group-text ${colors.searchBtnBg}  border-0`}>
                <FaSearch size={18} className={colors.searchIconColor} />
              </span>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  const SideBar = () => {
    const styles = `d-flex flex-column justify-content-center ${colors.sideBarBg} align-items-center p-3 `;
    return (
          <div className='d-none d-lg-block'>
            <div 
              style={{
                position:'fixed',
                top:'4vh',
                height:'100vh'
              }}
              className={styles}>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                  return (
                    <div key={index}>
                      <button
                          style={{ 
                            textAlign:'center', 
                            padding:'1.2rem', 
                            width:'5rem', 
                            top: `${index * 80 + 300}px`,
                            transition: "1s ease",
                          }}
                          
                          onClick={() => setCrrTab(item.name)}
                          className={`border-0 ${colors.sideBarBg} py-3 fw-bold ${
                            crrTab === item.name ? colors.bottomNavIconActive : "text-gray"
                          }`} >
                          <span><Icon size={30}/></span>
                          <p className='nav-item-text my-0 py-0'>{item.name}</p>
                      </button>
                    </div>
                  ) 
                })}
            </div>
          </div>

     
    )
  }

  const BottomNav = () => {

    let style =`d-flex justify-content-between align-items-center ${colors.bottomNav} shadow-lg px-4 pb-2`;

    return (
      <div className="fixed-bottom d-lg-none">
        <div className={style}>
          {menuItems.map((item) => {
            const Icon = item.icon;
              return (
                <div  
                    key={item.name}
                    onClick={() => setCrrTab(item.name)}
                    className={`text-center my-2 mx-2 fw-bold ${
                      crrTab === item.name ? colors.bottomNavIconActive : "btn-dark text-bottom-nav-icon"
                    }`} 
                    style={{
                      cursor:'pointer',
                      transition: "1s ease",
                    }}
                    >
                    <span><Icon size={30}/></span>
                    <p className='nav-item-text my-0 py-0'>{item.name}</p>
                </div>
              ) 
            })}
        </div>
      </div>
    )
  }

  return (
    <div className="main-container">

      {<TopBar/>}

      <div className='d-flex'>
        {<SideBar/>}
        <div className="lg-side pt-3 pb-5 my-5 w-100">{getCurrentComponent()}</div>
      </div>

      {<BottomNav/>}

    </div>
  );
};


const App = () => (
    <ThemeProvider>
      <MainApp/>
    </ThemeProvider>
  )

export default App; 
