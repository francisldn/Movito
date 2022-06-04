import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import { useState } from 'react';
import HomePage from '../components/HomePage'
import MoviesPage from '../components/MoviesPage'
import TVPage from '../components/TVPage'
import SearchPage from '../components/SearchPage'
import BookmarkedPage from '../components/BookmarkedPage'
import useAuth from '../hooks/useAuth'
import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'
import {Movie} from '../movieType.typings';
import HeaderSideBar from '../components/HeaderSideBar';

interface PageType {
  type:
  |'Home'
  |'Movies'
  |'TV Series'
  |'Bookmarked'
  |'Search'
}

interface Props {
  allList: Movie[] | DocumentData[];
  movieList: Movie[] | DocumentData[];
  tvSeriesList:Movie[] | DocumentData[];
  recommendedList:Movie[] | DocumentData[];
  trendingList: Movie[] | DocumentData[];
}

const Home = ({allList, movieList, tvSeriesList, recommendedList, trendingList}:Props) => {
  const {loading} = useAuth()
  const [page, setPage] = useState('Home')
  const [searchList, setSearchList] = useState<Movie[] | DocumentData[] | null>(allList)
  const [searchTitle, setSearchTitle] = useState<string | null>('')

  if(loading) return null
  
  return (
    <div className="flex min-h-screen flex-col py-2">
      <Head>
        <title>Entertainment Web App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header page={page} setPage={setPage}/>
      <div className="flex w-screen">
        <HeaderSideBar page={page} setPage={setPage}/>
       <main className="flex w-screen flex-1 flex-col lg:ml-32">
          <SearchBar page={page} setPage={setPage} searchList={searchList} setSearchList={setSearchList} searchTitle={searchTitle} setSearchTitle={setSearchTitle} allList={allList}/>
          {page === 'Home' && <HomePage trendingList={trendingList} recommendedList={recommendedList} searchTitle={searchTitle}/>}
          {page === 'Movies' && <MoviesPage movieList={movieList} searchTitle={searchTitle}/>}
          {page === 'TV Series' && <TVPage tvSeriesList={tvSeriesList} searchTitle={searchTitle}/>}
          {searchTitle 
          && <SearchPage searchList={searchList!} searchTitle={searchTitle}/>
          }
          {page === 'Bookmarked' && <BookmarkedPage searchTitle={searchTitle}/>}
        </main>
      </div>
      

    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const colRef = collection(db, 'movies')
  let movies = [] as DocumentData[]
  const data = await getDocs(colRef).then((snapshot) => {
    snapshot.docs.map((doc) => {
      movies?.push({...doc.data(), id: doc.id})
    })
    return movies;
  })
  const movieList = data.filter((show) => show.category === 'Movie')
  const tvSeriesList = data.filter((show) => show.category === 'TV Series')
  const trendingList = data.filter((show) => show.isTrending === true)
  const recommendedList = data.filter((show) => show.isTrending === false)
  
  return {
    props: {
      allList: data,
      recommendedList: recommendedList,
      movieList: movieList,
      tvSeriesList: tvSeriesList,
      trendingList: trendingList,
    }
  }
  
}