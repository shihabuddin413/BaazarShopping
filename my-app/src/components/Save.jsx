
import { FaTrash } from "react-icons/fa";
import { useTheme } from "../useTheme";
import { themeColors } from "../themes";
import ModalProductCard from './ModalProductCard';

import { useState } from "react";

const Save = ({ savedList, onRemove, handleSaveCartFunc,cartItemList,removeCartItemFunc }) => {

  const { theme } = useTheme();
  const colors = themeColors[theme];

  const [selectedItem, setSelectedItem] = useState(null); // modal এর জন্য state
  const [showModal, setShowModal] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => setSelectedItem(null), 300); // smooth fade effect
  };

  const checkItemInCart = (product) =>{
    return cartItemList.some(item => item.id === product.id);
  }


  return (
    <>
        <div className="pt-1">
            <div>
                <h3 className="my-2 ps-3 mb-3">Your saved Items </h3>
            </div>

            <div>   
                {
                    (savedList.length === 0) ?
                    (<div className={`border-0 ${colors.bgLi} m-3 p-2 rounded`}>
                        <span className={colors.txtLi}>No saved items yet.</span>
                    </div>)
                    :
                    <div className="list-group mx-3 ">{
                    savedList.map((item, index) =>{
                        console.log(item);
                        return(
                        <li key={index} 
                            className={`list-group-item ${colors.listClass} `}
                            onClick={() => handleItemClick(item)}
                            style={{ cursor: 'pointer' }}
                        >
                            
                            <div className="row align-items-center">
                                <div className="col-2">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="img-fluid"
                                        style={{ height:"50px", width: "50px", objectFit: "contain" }}
                                    /> 
                                </div>
                                <div className="col-7">
                                    
                                    { checkItemInCart(item) ?  
                                    <div>
                                    <p className="badge bg-danger m-0">Item is already in cart</p>
                                    </div> :'' }
                                    <p className={`${colors.text}`}>{item.title} </p>
                                </div>
                                
                                <div className="col-2 ms-auto text-end d-flex justify-content-end align-items-center">
                                    <button 
                                        className="btn btn-warning" 
                                        onClick={(e) => {
                                            e.stopPropagation(); // prevent modal trigger
                                            onRemove(item.id);
                                        }}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>   
                        </li>
                        )
                    })}
                    </div>
                }
            </div>
            
        </div>

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
    </>
  );
}

export default Save;