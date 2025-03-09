import { useContext } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer';
import CartContext from '../../Context'
import { LiaRupeeSignSolid } from "react-icons/lia";
import './index.css'
import CartItem from '../CartItem'
import { NavLink } from 'react-router-dom';

const Cart = () => {

    const { cartList, isOrderPlaced, placeOrder } = useContext(CartContext)

    const totalRupee = cartList.reduce((sum, acc) => sum + acc.quantity * acc.cost, 0);

    const imgUrl = !isOrderPlaced ?
        "https://res.cloudinary.com/dr0rmbfp4/image/upload/v1739714105/Layer_2_gipqv4.png" :
        "https://res.cloudinary.com/dr0rmbfp4/image/upload/v1739714557/check-circle.1_1_wohiim.png";

    return (
        <>
            <Navbar />
            {cartList.length === 0 ?
                <div className='d-flex flex-column align-items-center pt-4' style={{ height: "71vh" }}>
                    <img width="200px" src={imgUrl} alt="" />
                    <h1 className='text-center'>
                        {isOrderPlaced ?
                            "Payment Successful" :
                            "No Orders Yet!"
                        }
                    </h1>
                    <p className='text-center'>
                        {isOrderPlaced ?
                            "Thank you for ordering Your payment is successfully completed." :
                            "Your cart is empty. Add something from the menu."
                        }
                    </p>
                    <NavLink to={"/"}>
                        <button onClick={isOrderPlaced?placeOrder:null} className='btn btn-warning text-white' type="button">
                            {isOrderPlaced ?
                                "Go to home page" :
                                "Order Now"
                            }
                        </button>
                    </NavLink>
                </div> :
                <div className="cart-container">
                    <div className='d-none d-md-flex justify-content-between title'>
                        <p style={{ width: "30%" }}>Item</p>
                        <p >Count</p>
                        <p>Price</p>
                    </div>
                    <CartItem />
                    <div className='total-rupees mt-4'>
                        <h2>Order Placed</h2>
                        <div className='d-flex flex-column'>
                            <h2>Total Rupees: <mark><LiaRupeeSignSolid /> {totalRupee}/-</mark></h2>
                            <button onClick={placeOrder} className='btn btn-success mt-2 ' type="button">Place Order</button>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default Cart