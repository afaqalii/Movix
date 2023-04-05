import React, { useEffect, useState } from 'react'
import {fetchDataFromApi} from "../../utils/api"
import "./searchResults.scss"
import Spinner from '../../components/spinner/Spinner'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import InfiniteScroll from 'react-infinite-scroll-component'
import MovieCard from '../../components/movieCard/MovieCard'
import { useParams } from 'react-router-dom'
const SearchrResults = () => {
  const [data, setData] = useState(null)
  const [pageNum, setPageNum] = useState(1)
  const [laoding, setLoading] = useState(false)
  const {query} = useParams()
  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        setData(res)
        setPageNum((prev) => prev + 1)
        setLoading(false)
      })
  }
  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if(data.results) {
          setData({...data, results:[...data.results, ...res]})
        }else {
          setData(res)
        }
        setPageNum((prev) => prev + 1)
      })
  }
  useEffect(() => {
    fetchInitialData()
  },[query])
  return (
    <div className='searchResultsPage'>
       {laoding && <Spinner initial={true}/>}
       {!laoding && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
            <div className="pageTitle">
              {`Search ${data.total_result > 1 ? "results": "result"} of ${query}`}
            </div>
            <InfiniteScroll 
               className='content'
               dataLength={data?.results?.length || [] }
               next={fetchNextPageData}
               hasMore={pageNum <= data.total_pages}
               loader={<Spinner/>}
               >
              {data.results.map((item, index) => {
                if(item.mediaType === "person") return
                return (
                  <MovieCard key={index} data={item} fromSearch={true}/>  
                  
                )
              })}
            </InfiniteScroll>
            </>
          ):(
           <div className="resultNotFound">Sorry, Results not found</div>
          )}
        </ContentWrapper>
       )}
    </div>
  )
}

export default SearchrResults