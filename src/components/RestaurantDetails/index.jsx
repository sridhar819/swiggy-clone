import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import Cookies from 'js-cookie'
import FoodItem from '../FoodItem'
import Footer from '../Footer'
import { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";


import './index.css'

const foodStages = { initial: "LOADING", success: "SUCCESS", failure: "FAILURE" }

const RestaurantDetails = () => {
    const { id } = useParams()
    const [fetchedData, setData] = useState({ stage: foodStages.success, foodBannerData: {}, foodList: [] })

    const getFoodData = async () => {
        const url = `https://apis.ccbp.in/restaurants-list/${id}`
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get('jwt_token')}`
            }
        }
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
            const foodItems = data.food_items.map(each => ({
                ...each,
                imageUrl: each.image_url,
                foodType: each.food_type,
            }))
            const updatedBanner = {
                ...data,
                costForTwo: data.cost_for_two,
                imageUrl: data.image_url,
                itemsCount: data.items_count,
                opensAt: data.opens_at,
                reviewsCount: data.reviews_count
            }
            setData(({ foodList: foodItems, stage: foodStages.success, foodBannerData: updatedBanner }))
        }
    }

    useEffect(() => {
        getFoodData()
    }, [])

    const renderFoodSuccesView = () => (
        <div className="food-list">
            {fetchedData.foodList.map(each => <FoodItem key={each.id} details={each} />)}
        </div>
    )

    const spinner = () => (
        <div style={{ height: "200px" }} class="d-flex justify-content-center align-items-center">
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )

    const rendersuccesBannerView = () => {
        const { foodBannerData } = fetchedData
        const { imageUrl, name, costForTwo, cuisine, location, rating, id, itemsCount, opensAt, reviewsCount } = foodBannerData

        return (
            <div className="bg-banner-card">
                <div className="banner-card">
                    <div className="image-card-food">
                        <img src={imageUrl} alt="banner" />
                    </div>
                    <div className="banner-details-food">
                        <h5>{name}</h5>
                        <p>{cuisine}</p>
                        <p style={{ fontSize: "13px" }} className='text-warning fw-700 d-flex align-items-center gap-1'><FaStar /> {rating} ({reviewsCount})</p>
                        <p className='text-light'>Opens at <u style={{ textDecorationColor: "yellow" }}>{opensAt}</u></p>
                        <p style={{ fontSize: "11px" }} className='text-info fw-500'>{location}</p>
                    </div>
                </div>
            </div>
        )
    }

    const renderFoodView = () => {
        switch (fetchedData.stage) {
            case (foodStages.initial):
                return <>{spinner()}</>
            case (foodStages.success):
                return (
                    <>
                        {rendersuccesBannerView()}
                        {renderFoodSuccesView()}
                    </>)
            case (foodStages.failure):
                return <p>failure</p>
            default:
                return null
        }
    }

    return (
        <>
            <Navbar />
            {renderFoodView()}
            <Footer />
        </>
    )

}

export default RestaurantDetails