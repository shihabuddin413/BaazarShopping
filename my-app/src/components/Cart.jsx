import { FaTrash, FaList, FaTable, FaBars,FaMinusCircle, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { useTheme } from "../useTheme";
import { themeColors } from "../themes";
import { useState } from "react";


const Cart = ({cartItemList, 
               removeCartItemHandler, 
               handleEmptyCartFunc,
               CartItemQuantityIncrease, 
               CartItemQuantityDecrease}) => {

  const { theme } = useTheme();
  const colors = themeColors[theme];
  const displayFlex = 'd-flex justify-content-between align-items-center';

  const [viewMode, setViewMode] = useState(1)  //    1: detailed, 0: List

  const totalBillCalc =()=>{
    let sum =0;

    for (let i=0; i<cartItemList.length; i+=1){
      sum += cartItemList[i].partialBill()
    }

    return sum.toFixed(2);
  }

  const detailedView =(row)=>{
    return (
    <div key={row.id} className={` ${colors.cartItemBg} p-2 mt-2 nav-item-text rounded`}>

      <div className="d-flex align-items-center justify-content-between">
        <p className="m-0 flex-grow-1">{row.cartItem.title}</p>
        
        <div className="d-flex align-items-start">
          <button style={{ height: '30px', paddingTop:'0' }} 
                  onClick={()=>CartItemQuantityIncrease(row.id)}
                  className="btn btn-sm btn-warning ">
            <FaPlus size={12}/>
          </button>
          <button style={{ height: '30px', paddingTop:'0' }} 
                  onClick={()=>CartItemQuantityDecrease(row.id)}
                  className="btn btn-sm btn-warning mx-1">
            <FaMinus size={12}/>
          </button>
          <button style={{ height: '30px', paddingTop:'0' }} 
                  onClick={()=>removeCartItemHandler(row.id)}
                  className="btn btn-sm btn-danger ">
            <FaTrash size={12}/>
          </button>
        </div>
      </div>


      <div className="d-flex justify-content-between border-top pt-3 mt-2">

        <div className="row nav-item-text ps-3">
            
            <span className={`col-4 ${colors.text}`}>
              Product Id 
            </span>
            <span className={`col-8 text-orange`}>
              {row.cartItem.id}
            </span>

            <span className={`col-4 ${colors.text}`}>
              Catagory
            </span>
            <span className={`col-8 text-orange`}>
              {row.cartItem.category}
            </span>


            <span className={`col-4 ${colors.text}`}>
              Quantity
            </span>
            <span className={`col-8 text-orange`}>
              x {row.quantity}
            </span>

            <span className={`col-4 ${colors.text}`}>
              price
            </span>
            <span className={`col-8 text-orange`}>
              ${row.cartItem.price}
            </span>  

            <div className="col-12 ">
              
              <div className="dashed-border text-orange mt-2 pt-2 d-flex justify-content-between">
                <span>Sub Total</span>
                <span>${row.partialBill().toFixed(2)}</span>
              </div>
            </div>                   
        </div>

        <div>
            <img src={row.cartItem.image}
                alt={row.cartItem.title}
                style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "contain",
                }}
                className={`mb-3 ${colors.modalPic} p-2 rounded`}
            />
        </div>

      </div>
    
      
    </div>
    )
  }

  const ListView = (row) =>{
    return (
      <div key={row.id} className={` ${colors.cartItemBg} row p-2 mt-2 m-2 nav-item-text rounded`}>
          <span className="col-1 me-1">
            <img src={row.cartItem.image}
                alt={row.cartItem.title}
                style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "contain",
                }}
                className={` ${colors.modalPic} p-1 rounded`}
            />
          </span>
          <span className="col-6"><span className="text-orange me-1">#{row.id}</span>{row.cartItem.title}</span>
          <span className="col-3">
            <span className="text-orange">{row.quantity} x ${row.cartItem.price}</span><br/>
            <span>${row.partialBill()}</span>
          </span>
          <div className="col-1 text-danger ms-auto text-end" 
               onClick={()=>removeCartItemHandler(row.id)}>
            <FaMinusCircle size={20}/>
          </div>
      </div>
    )
  }


  if (cartItemList.length  == 0){
    return(
       <div className="">
        <p className={`${colors.text} ${colors.cartItemBg} m-2 p-2 rounded`}>No Items in cart</p>
       </div>
    )
  }


  return ( 
    <>
      <div className="p-3" >

          <div style={{ position: "fixed", height:'60px',top: '7vh', width:'100%', 
                        background:colors.cartTopBarBg, zIndex: 1000,  padding: "10px" }} 
                        className={`${displayFlex} pt-3`}
          >
            <div style={{ paddingTop:'0.8rem'}}>
              <p className="fs-5">Cart Items
                <span className="text-orange ps-2">({cartItemList.length})</span>
              </p> 
            </div>
            <div className="d-flex m-0 p-0">   
              <button className={`btn btn-sm ${colors.cartItemBg} ${colors.text} ${displayFlex} me-1 
                                  ${viewMode === 1 ? 'border-2 border-warning':'' }`}
                      onClick={()=>setViewMode(1)}
                      >
                <FaTable/>
              </button>           
              <button className={`btn btn-sm ${colors.cartItemBg} ${colors.text} ${displayFlex} me-4  
                                  ${viewMode === 0 ? 'border-2 border-warning':'' }`}
                      onClick={()=>setViewMode(0)}>
                <FaList/>
              </button>
              <button 
                className={`btn btn-sm btn-danger ${displayFlex} me-4`}
                onClick={()=>handleEmptyCartFunc()} 
              >
                <FaTrash className='me-1'/>
                <FaBars/>
              </button>
             
            </div>
          </div>
          
          <div style={{paddingBottom:'5vh', paddingTop:'5vh'}}>
          {
            cartItemList.map((row)=>{
              return viewMode ? detailedView(row) : ListView(row)
            })
          }
          </div>

          
      </div> 

      <div className={`${displayFlex} p-2  ${colors.totalBillBg} text-white rounded shadow`}
              style={{
                position: 'fixed',
                bottom: '12vh',  // 80% down from top
                left: '15px', // optional
                zIndex: 1000,
                width:'93%'
              }}
          >
             <div>
                <span className={colors.text}>Total Payment </span>
                <span className={`bg-info text-dark text-center px-2 rounded fw-bold`}>${totalBillCalc()}</span>
             </div>
             <div>
                <button className={`${displayFlex} btn btn-sm ${colors.checkoutBtn}`}>
                  <FaShoppingCart size={20}/>
                  <span className="ps-1 fw-bold">Pay!</span>
                </button>
             </div>
      </div>
      
    </>
  )
}

export default Cart;