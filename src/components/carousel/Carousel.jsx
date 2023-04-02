import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import dayjs from "dayjs";

import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./styles.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({data, loading}) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home)
    const navigate = useNavigate()
    const navigation = (dir) => {
        const container = carouselContainer.current
        const scrollAmount = dir === "left" 
         ? container.scrollLeft - (container.offsetWidth + 20 )
         : container.scrollLeft + (container.offsetWidth + 20)
    }
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }
    return (
    <div className="carousel">
        <ContentWrapper>
            <BsFillArrowLeftCircleFill 
               className="carouselLeftNav arrow"
               onClick={() => navigation("left")}
               />
               <BsFillArrowRightCircleFill
                className="carouselRightNav arrow"
                onClick={() => navigation("right")}
                />
                {!loading ? (
                     <div ref={carouselContainer} className="carouselItems">
                        {data?.map((item) => {
                            const posterUrl = item.poster_path 
                               ? url.poster + item.poster_path 
                               : PosterFallback
                            return (
                                <div 
                                key={item.id} 
                                className="carouselItem">
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(

                                        )}/>
                                        <Genres data={item.genre_ids.slice(0,2)}/>
                                    </div>
                                    <div className="textBlock">
                                        <div className="title">
                                            {item.title || item.name }
                                        </div>
                                        <div className="date">
                                            {dayjs(item.release_Date).format("MMM D, YYYY")}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                     </div>
                ): (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel