import { FaRupeeSign } from "react-icons/fa";
import './FoodItem.css'
import { useContext } from "react";
import CartContext from "../Context";


const FoodItem = ({ details }) => {
    const { name, id, foodType, imageUrl, cost } = details

    const { addCart, cartList, removeCart } = useContext(CartContext)

    const isIncludedinCart = cartList.find(each => each.id === id)

    return (
        <div className='food-item'>
            <div className="image-card-food-item">
                <img className="img-fluid" src={imageUrl} alt='res' />
            </div>
            <div className="d-flex align-items-center justify-content-between">
                <div className="food-item-details">
                    <h2>{name.length < 14 ? name : `${name.slice(0, 12)}...`}</h2>
                    <p>{foodType}</p>
                    <p className="cost"><FaRupeeSign />{cost} /-</p>
                </div>
                {isIncludedinCart ? <button onClick={() => removeCart(id)} className="btn btn-danger add-btn">Remove</button> :
                    <button onClick={() => addCart(details)} className="btn btn-success add-btn" type="button">Add</button>
                }
            </div>

        </div>
    )
}

export default FoodItem