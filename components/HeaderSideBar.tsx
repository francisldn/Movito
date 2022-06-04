import useAuth from '../hooks/useAuth';
import {HeaderProps} from './Header';
import {RefObject, useRef} from 'react';
import Link from 'next/link';

const HeaderSideBar = ({page, setPage}:HeaderProps) => {
    const {logout} = useAuth()

    return (
        <div className="fixed ml-8 my-8 min-w-[96px] h-[calc(100vh-4rem)] bg-[#161D2F] text-white hidden lg:flex flex-col border-red-500 border2">
                <div className="w-[25px] h-[20px] mx-auto py-8">
                    <Link href="/">
                        <a><img src="/assets/logo.svg" alt="logo" /></a>
                    </Link>
                </div>
                <div className="flex flex-col mx-auto pt-8 gap-8 flex-1">
                    <div className="w-[20px] h-[20px] cursor-pointer" onClick={() => setPage('Home')}>
                        <img 
                            src={`${page === 'Home'? "/assets/icon-nav-home-active.svg" : "/assets/icon-nav-home.svg" }`}
                            alt="home"/>
                    </div>
                    <div className="w-[20px] h-[20px] cursor-pointer" onClick={() => setPage('Movies')}>
                        <img 
                        src={`${page === 'Movies'? "/assets/icon-nav-movies-active.svg" : "/assets/icon-nav-movies.svg" }`}
                        alt="movies" />
                    </div>
                    <div className="w-[20px] h-[20px] cursor-pointer" onClick={() => setPage('TV Series')}>
                        <img 
                            src={`${page === 'TV Series'? "/assets/icon-nav-tv-series-active.svg" : "/assets/icon-nav-tv-series.svg" }`}
                            alt="tv-series" />
                    </div>
                    <div className="w-[20px] h-[20px] cursor-pointer" onClick={() => setPage('Bookmarked')}>
                        <img 
                            src={`${page === 'Bookmarked'? "/assets/icon-nav-bookmark-active.svg" : "/assets/icon-nav-bookmark.svg" }`}
                            alt="bookmarked" />
                    </div>
                </div>
                <div className="w-[40px] h-[40px] mx-auto place-self-end mb-5 box-border cursor-pointer">
                    <img src="/assets/image-avatar.png" alt="avatar" onClick={logout}/>
                </div>
        </div>
    );
}

export default HeaderSideBar;