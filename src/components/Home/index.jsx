import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RestaurantItem from "../RestaurantItem";
import Footer from "../Footer";
import { MdSort } from "react-icons/md";


import Cookies from "js-cookie";

import Navbar from "../Navbar";
import './index.css'


const offerStages = { initial: "LOADING", success: "SUCCESS", failure: "FAILURE" };
const restaurantStage = { initial: "LOADING", success: "SUCCESS", failure: "FAILURE" };

const optionList = [{ id: 1, value: "Lowest" }, { id: 2, value: "Highest" }]

const Home = () => {
    const [offerList, setOfferData] = useState({ stage: offerStages.initial, offers: [] });
    const [activepage, setPage] = useState(1)
    const [restaurantData, setRestaurantData] = useState({ stage: restaurantStage.initial, restaurantList: [] });
    const [activeOption, setOption] = useState(optionList[0].value)


    const [bar, setBar] = useState(0)

    const getOfferList = fetchingData(setOfferData);

    useEffect(() => {
        let intervalId = setInterval(() => {
            if (bar < 100) {
                setBar(pre => pre + 10)
            }
            else {
                getOfferList()
                clearInterval(intervalId)

            }
        }, 100)
        return () => {
            clearInterval(intervalId)
        }

    }, [bar]);

    const getRestaurantData = getResDataFetch(activepage, activeOption, setRestaurantData)

    useEffect(() => {
        getRestaurantData()
    }, [activepage, activeOption])

    const renderRestaurantSuccessView = getResData(restaurantData, setPage, activepage, setBar, setRestaurantData);
    const renderSuccessView = gerBanner(offerList);

    const renderFailureView = () => (
        <div className="error-view">
            <p>Failed to load offers. Please try again.</p>
        </div>
    );

    const renderLoadingView = () => (
        <div className="loading-view">
            <div style={{ transform: `translateX(${bar - 100}%)` }} className="loader"></div>
        </div>
    );

    const renderBannerView = () => {
        switch (offerList.stage) {
            case offerStages.initial:
                return renderLoadingView();
            case offerStages.success:
                return renderSuccessView();
            case offerStages.failure:
                return renderFailureView();
            default:
                return null;
        }
    };

    const renderRestaurantView = () => {
        switch (restaurantData.stage) {
            case restaurantStage.initial:
                return renderLoadingView();
            case restaurantStage.success:
                return renderRestaurantSuccessView();
            case restaurantStage.failure:
                return renderFailureView();
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <div className="home-banner">
                {renderBannerView()}

                <div className="sort-card">
                    <h2 className="popular">Popular Restaurants</h2>
                    <p>Select Your favourite restaurant special dish and make your day happy...</p>
                    <div>
                        <button type="button"><MdSort /></button>
                        <select onChange={(e) => {
                            setOption(e.target.value)
                            setBar(0)
                            setRestaurantData({ stage: restaurantStage.initial })
                        }} value={activeOption}>
                            {optionList.map(each =>
                                (<option key={each.id}>{each.value}</option>))}
                        </select>
                    </div>
                </div>
                {renderRestaurantView()}
            </div>
            <Footer />
        </>
    );
};

export default Home;




// getResDataDetails

function getResDataFetch(activepage, activeOption, setRestaurantData) {
    return async () => {
        const offset = (activepage - 1) * 9;
        const url = `https://apis.ccbp.in/restaurants-list?&offset=${offset}&limit=9&sort_by_rating=${activeOption}`;
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt_token")}`,
            },
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {

            const updatedRestaurantList = data.restaurants.map(each => ({
                ...each,
                costForTwo: each.cost_for_two,
                groupByTime: each.group_by_time,
                hasOnlineDelivery: each.has_online_delivery,
                hasTableBooking: each.has_table_booking,
                imageUrl: each.image_url,
                isDeliveryNow: each.is_delivery_now,
                menuType: each.menu_type,
                opensAt: each.opens_at,
                userRating: {
                    rating: each.user_rating.rating,
                    ratingColor: each.user_rating.rating_color,
                    ratingText: each.user_rating.rating_text,
                    totalReviews: each.user_rating.total_reviews
                }
            }));

            setRestaurantData({ stage: restaurantStage.success, restaurantList: updatedRestaurantList });

        }
        else {
            setRestaurantData({ stage: restaurantStage.failure });
        }
    };
}

// fetchingData

function fetchingData(setOfferData) {
    return async () => {
        const url = "https://apis.ccbp.in/restaurants-list/offers";
        const options = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("jwt_token")}`,
            },
        };
        try {
            const response = await fetch(url, options);
            if (response.ok) {
                const data = await response.json();
                const updatedDataOffer = data.offers.map(each => ({
                    imageUrl: each.image_url,
                    id: each.id,
                }));
                setOfferData({ stage: offerStages.success, offers: updatedDataOffer });
            } else {
                setOfferData({ stage: offerStages.failure });
            }
        } catch (error) {
            setOfferData({ stage: offerStages.failure });
        }
    };
}

// getRestaurantData

function getResData(restaurantData, setPage, activepage, setBar, setRestaurantData) {
    return () => (
        <>
            <div className="restaurant-item">
                {restaurantData.restaurantList.map(each => <RestaurantItem key={each.id} details={each} />)}

            </div>
            <div className="d-flex gap-2 align-items-center mt-3 mb-4 justify-content-center" style={{ margin: "auto", width: "30%" }}>
                <button onClick={() => setPage(1)} className="btn btn-secondary" type="button">First</button>
                <button
                    disabled={activepage <= 1}
                    onClick={() => {
                        if (activepage > 1) {
                            setPage(pre => pre - 1);
                            setBar(0);
                            setRestaurantData({ stage: restaurantStage.initial });
                        }
                    }} className="btn btn-danger" type="button">prev</button>
                <p className="text-danger fw-bold fs-5 pt-3">{activepage}</p>
                <button
                    disabled={activepage >= 4}
                    onClick={() => {
                        if (activepage < 4) {
                            setPage(pre => pre + 1);
                            setRestaurantData({ stage: restaurantStage.initial });
                            setBar(0);
                        }
                    }} className="btn btn-success" type="button">next</button>
                <button onClick={() => setPage(4)} className="btn btn-warning text-light" type="button">Last</button>
            </div>
        </>
    );
}

// getBannerData

function gerBanner(offerList) {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 800,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const renderSuccessView = () => (
        <div className="slider">
            <Slider {...settings}>
                {offerList.offers.map((offer) => (
                    <div key={offer.id} className="banner-image-card">
                        <img className="banner-img" src={offer.imageUrl} alt="offer" />
                    </div>
                ))}
            </Slider>
        </div>
    );
    return renderSuccessView;
}

