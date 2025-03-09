
import { useContext } from 'react'
import CartContext from '../../Context'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";

import './index.css'


const CartItem = () => {
    const { cartList, increaseCount, decreaseCount, removeCart } = useContext(CartContext);

    return (
        <div>
            {cartList.map(each => (
                <div key={each.id} className="cart-item">
                    <div className='cart-img'>
                        <img style={{ objectFit: "cover", borderRadius: "4px" }} width="200px" height="130px" src={each.imageUrl} alt="cartimage" />
                        <h2>{each.name}</h2>
                    </div>
                    <div className="cart-details">
                        <div className='count-card'>
                            <button onClick={() => decreaseCount(each.id)} className='btn text-danger' type="button"><FaMinus /></button>
                            <p>{each.quantity}</p>
                            <button onClick={() => increaseCount(each.id)} className='btn text-danger' type="button"><FaPlus /></button>
                        </div>
                        <div>
                            <p style={{ margin: "0" }} className='rupee'><LiaRupeeSignSolid />{each.quantity * each.cost} /-</p>
                            <button onClick={() => removeCart(each.id)} className='btn text-danger'>remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default CartItem