import { Link } from 'react-router-dom'
import { IoMdStar } from "react-icons/io";
import './RestaurantItem.css'

const RestaurantItem = ({ details }) => {
    const { costForTwo, cuisine, groupByTime, hasOnlineDelivery, hasTableBooking, imageUrl, id, isDeliveryNow, location, menuType, name, opensAt, userRating } = details
    const { rating, ratingText, ratingColor, totalReviews } = userRating
    return (
        <Link className='link' to={`/restaurant/${id}`}>
            <div className="each-item">
                <div className="image-card">
                    <img src={imageUrl} alt="res-image" />
                </div>
                <div className='res-details'>
                    <h2>{name.length < 23 ? name : name.slice(0, 23) + "..."}</h2>
                    <h3>{cuisine}</h3>
                    <div className="rating-card">
                        <p className='rating'><IoMdStar color={`#${ratingColor}`} size={20} />{rating}</p>
                        <p className='avg'>({totalReviews}) <span>{ratingText}</span></p>
                    </div>
                    <div className="other-details">
                        <p>Online Delivery - <b style={{ color: hasOnlineDelivery ? "green" : "red", textDecoration: hasOnlineDelivery ? "underline" :"line-through"}}>{hasOnlineDelivery ? "Yes" : "no"}</b></p>
                        <p>Opens At {opensAt}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default RestaurantItem