import React from 'react'
import HeroBanner from './heroBanner/HeroBanner'
import Trending from './trending/Trending'

const Home = () => {
  return (
    <div>
        <HeroBanner/>
        <Trending/>
        <div style={{height:"100vh"}}></div>
    </div>
  )
}

export default Home