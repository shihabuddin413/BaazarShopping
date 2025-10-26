
import { FaStar, FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import CartItemModel from "./Models/CartItemModel";
import { useState , useEffect} from "react";

const ModalProductCard = ({handleClose, handleSaveCartItem, cartItemList, selectedItem, removeCartItemFunc, colors}) => {

    const [count, setCount] = useState(0);
    const [itemAddedSuccess, setItemAddedSuccess] = useState(false)
    const [itemUpdateSt, setitemUpdateSt] = useState(false)
    const [msg, setMsg] = useState('Cart item updated!')

    useEffect(() => {
    // Disable background scroll
    document.body.style.overflow = "hidden";
    document.body.style.pointerEvents = "none"; // disable click on background

    // Cleanup on close
    return () => {
        document.body.style.overflow = "auto";
        document.body.style.pointerEvents = "auto";
    };
    }, []);


    useEffect(() => {
    if (cartItemList?.length > 0) {
            const selectedCartItem = cartItemList.find(item => item.id === selectedItem.id);
            
            if (selectedCartItem) {
                const prevQuantity = selectedCartItem.quantity
                setCount(parseInt(prevQuantity));
                setitemUpdateSt(true)
                console.log(' cartItemList[selectedItem.id]: ',prevQuantity)
            }
        }
    }, []);

    const handleAddCartClick = () => {

        const selectedCartItem = cartItemList.find(item => item.id === selectedItem.id);

        if (count > 0 || selectedCartItem) {

           

            if (count == 0 && selectedCartItem){
                console.log('inside count 0 & selected item exist')
                removeCartItemFunc(selectedItem.id)
                setItemAddedSuccess(true);
                setMsg('Item removed from cart!')
                setTimeout(() => {
                    setItemAddedSuccess(false);
                    handleClose();
                }, 800);

                return
            }

            setMsg('Cart item updated!')
            handleSaveCartItem(selectedItem, count);
            setItemAddedSuccess(true); // show success message

            // hide message and close modal after 3s
            setTimeout(() => {
                setItemAddedSuccess(false);
                handleClose();
            }, 800);
           
            return;
        } 
        setItemAddedSuccess(true);
        setTimeout(() => {
            setItemAddedSuccess(false);
        }, 1000);
        setMsg ('Quantiy can not be Zero')
        console.log("Quantity is 0");
    };

    const updateCount = (term) => {
        if (count == 0 && term == '-'){
            setCount(0);
            return;
        }
        setCount(term == '+' ? count+1 : count-1)
    }

    return (
        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(3px)",
                transition: "opacity 0.3s ease",
            }}
            onClick={handleClose}
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={`modal-content ${colors.bgLi} shadow-lg rounded-4 `}>
                        <div className={`modal-header ${colors.modalHeaderBorder} mb-0 py-0`}>
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <p className={`modal-title ${colors.text} nav-item-text fw-bold`}>{selectedItem.title}</p>
                                <button type="button" className={`btn ${colors.text}`} onClick={handleClose}>
                                    <FaTimes size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="modal-body pt-0 text-justify mt-2">
                            <div className="d-flex justify-content-start  ps-1 align-items-center w-100 pb-3">
                                {/* Success Message */}
                                
                                <div className={` ${colors.modalPic} p-2 rounded me-2 `}>
                                    <img
                                        src={selectedItem.image}
                                        alt={selectedItem.title}
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "contain",
                                        }}
                                        className="mb-3"
                                    />
                                </div>
                                <div className=" d-flex flex-column align-items-start ms-2 fw-bolder ">
                                    <div className="text-info">
                                        <span className={`border badge ${colors.text} me-2`}>Price</span> 
                                        <span className="fw-bold">${selectedItem.price}</span>
                                    </div>

                                    <span className={colors.text}>
                                        <span className="bg-warning text-dark badge me-2">Rating</span>
                                        <span>{selectedItem.rating.rate}</span>
                                        <FaStar className="text-warning pb-1" size={18}/>        
                                    </span>

                                    <span className={`${colors.text} bg-warning text-dark badge me-1 mt-1`}>
                                        <span className="">Reviews</span>
                                        <span> {selectedItem.rating.count} </span>
                                    </span>


                                    <div className="mt-3">
                                        <div className="input-group input-group-sm">
                                            <span className={`input-group-text p-0 px-2 ${colors.modalBtnStyle}`} 
                                                  onClick={()=>updateCount('-')}
                                                  style={{cursor:'pointer'}}>
                                                <FaMinus size={15}/>
                                            </span>
                                            <span className={`form-control ${colors.modalCountStyle}`} 
                                                   style={{
                                                    width:'2rem',
                                                    textAlign:'center'
                                                   }}
                                                >{count}</span>
                                            <span className={`input-group-text p-0 px-2 ${colors.modalBtnStyle}`}
                                                  onClick={()=>updateCount('+')} 
                                                  style={{cursor:'pointer'}}>
                                                <FaPlus size={15}/>
                                            </span>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            {itemAddedSuccess && (
                                    <p className={`alert 
                                        ${
                                            msg == 'Cart item updated!' ? 'alert-success':
                                               msg == 'Item removed from cart!'? 'alert-danger':'alert-info'
                                        } text-center py-1`}>
                                        {msg}
                                    </p>
                            )}
                            <div className={` rounded p-2 pb-0 ms-1 ${colors.modalPic} my-1`}   >
                                <span className={`badge ${colors.aboutPrdBadge} mb-1`}>About product</span>
                                
                                <p className={`${colors.text} pb-3 ps-1 text-left nav-item-text`}>{selectedItem.description}</p>
                            </div>
                            <div className=" ms-1 d-flex">     
                                <button className="btn btn-danger btn-sm w-25 me-2" 
                                    onClick={handleClose}>Cancel</button>
                                <button className={`btn ${itemUpdateSt ? 'btn-info':'btn-warning'} btn-sm w-75`}
                                    onClick={handleAddCartClick}>
                                        {itemUpdateSt ? 'Update Cart':'Add to cart'}
                                    </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default ModalProductCard;