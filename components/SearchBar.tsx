import { DocumentData } from "firebase/firestore";
import { Dispatch, RefObject, SetStateAction, SyntheticEvent, useCallback, useEffect, useRef, useState } from "react";
import { Movie } from "../movieType.typings";
interface SearchProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
    searchList:Movie[] | DocumentData[] | null;
    setSearchList: Dispatch<SetStateAction<Movie[] | DocumentData[] | null>>;
    allList: Movie[] | DocumentData[] | null;
    searchTitle: string | null;
    setSearchTitle: Dispatch<SetStateAction<string | null>>
}

const Search = ({page, setPage,searchList, setSearchList, allList, searchTitle, setSearchTitle}: SearchProps) => {
    
    const inputRef = useRef<HTMLInputElement | null>(null)
    
    const handleSearch = useCallback((value:string|null) => {
        const placeholder = inputRef.current?.attributes[1].value.toLowerCase();

        if (placeholder?.includes('movies') && !placeholder?.includes('tv series') && allList && searchTitle) {
            setSearchList(allList?.filter((show) => (show.category === 'Movie') && (show.title.toLowerCase().includes(value?.toLowerCase()))))
        } else if(placeholder?.includes('tv series') && !placeholder?.includes('movies') && allList && searchTitle) {
            setSearchList(allList?.filter((show) => (show.category === 'TV Series') && (show.title.toLowerCase().includes(value?.toLowerCase()))))
        } else if(placeholder?.includes('bookmarked') && allList && searchTitle) {
           setSearchList(allList?.filter((show) => (show.isBookmarked === true) && (show.title.toLowerCase().includes(value?.toLowerCase()))))
        } else if (allList && value) {
            setSearchList(allList?.filter((show) => show.title.toLowerCase().includes(value?.toLowerCase())))
        }
    },[searchTitle])

    useEffect(() => {
        handleSearch(searchTitle)
    },[searchTitle])
    
    
    return (
        <div className="flex mx-4 md:mx-8 space-x-5 md:max-w-[calc(100vw-14rem)] h-8 md:h-10 my-5 items-center mt-20 lg:mt-6">
            <div className="w-6 h-6">
                <img src="/assets/icon-search.svg" alt="search" />
            </div>
            <input 
                type="text" 
                ref = {inputRef}
                placeholder={
                    page === 'Movies'
                    ? "Search for movies"
                    : page === 'TV Series'
                    ? "Search for TV series"
                    : page === 'Bookmarked'
                    ? "Search for bookmarked shows"
                    :  "Search for movies or TV series"
                } 
                onChange={(e) => {
                    setSearchTitle(e.target.value)
                    handleSearch(searchTitle)
                }}
                className="bg-[#10141e] drop-shadow-[0_4px_4px_rgba(0, 0, 0, 0.25)] cursor-pointer focus:outline-hidden focus:border-0 w-full md:mx-4 text-[18px] md:text-[24px] flex-1 w-screen h-full focus:placeholder:!text-transparent"/>
        </div>
    );
}

export default Search;