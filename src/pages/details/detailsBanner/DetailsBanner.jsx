import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "./PlayButton";

const DetailsBanner = ({ video, crew }) => {

    const {mediaType , id} = useParams()
    const {data, loading} = useFetch(`/${mediaType}/${id}`)
    const {url} = useSelector((state) => state.home)
    const _genres = data?.genres?.map((g) => g.id)
    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
  
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                {!!data && (
                    <React.Fragment>
                    <div className="backdrop-img">
                        <Img src={url.backdrop + data.backdrop_path} />
                    </div>
                    <div className="opcaity-layer"></div>
                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path ? (
                                    <Img 
                                      className="posterImg"
                                      src={url.backdrop + data.poster_path}
                                     />
                                    ) : (
                                        <Img 
                                      className="posterImg"
                                      src={url.backdrop + data.poster_path}
                                     />
                                     )   
                                }
                            </div>
                            <div className="right">
                                <div className="title">
                                    {`${data.name || data.title} (${dayjs(data?.release_date).format("YYYY")})`}
                                </div>
                                <div className="subtitle">
                                    {data.tagline}
                                </div>
                            <Genres data={_genres} />
                            <div className="row">
                                <CircleRating rating={data?.vote_average.toFixed()}/>
                                <div className="playbtn">
                                <PlayIcon/>
                                <span className="text">Watch Trailer</span>
                            </div>
                            </div>
                            <div className="overview">
                                <div className="heading">Overview</div>
                                <div className="description">
                                    {data.overview}
                                </div>
                            </div>
                            <div className="info">
                                {data.status && (
                                    <div className="infoItem">
                                        <span className="text bold">Status:{""}</span>
                                        <div className="text">
                                            {data.status}
                                        </div>
                                    </div>
                                )}
                                {data.release_date && (
                                    <div className="infoItem">
                                        <span className="text bold">Release Date:{""}</span>
                                        <div className="text">
                                            {dayjs(data.release_date).format("MMM D, YYYY")}
                                        </div>
                                    </div>
                                )}
                                {data.runtime && (
                                    <div className="infoItem">
                                        <span className="text bold">Runtime:{""}</span>
                                        <div className="text">
                                            {toHoursAndMinutes(data.runtime)
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                            </div>
                        </div>
                    </ContentWrapper>
                    </React.Fragment>
                )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
