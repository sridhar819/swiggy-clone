import { useContext } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer';
import CartContext from '../../Context'
import { LiaRupeeSignSolid } from "react-icons/lia";
import './index.css'
import CartItem from '../CartItem'

const Cart = () => {

    const { cartList } = useContext(CartContext)

    const totalRupee = cartList.reduce((sum, acc) => sum + acc.quantity * acc.cost, 0);

    return (
        <>
            <Navbar />
            <div className="cart-container">
                <div className='d-flex justify-content-between title'>
                    <p style={{ width: "30%" }}>Item</p>
                    <p >Count</p>
                    <p>Price</p>
                </div>
                <CartItem />
                <div className='total-rupees mt-4'>
                    <h2>Order Placed</h2>
                    <div className='d-flex flex-column'>
                        <h2>Total Rupees: <mark><LiaRupeeSignSolid /> {totalRupee}/-</mark></h2>
                        <button className='btn btn-success mt-2 ' type="button">Place Order</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart