import { Dispatch, SetStateAction } from "react";
import HomeIcon from '../public/assets/icon-nav-home.svg'
import HomeIconActive from '../public/assets/icon-nav-home-active.svg'
import useAuth from "../hooks/useAuth";
import Link from "next/link";
export interface HeaderProps {
    page: string;
    setPage: Dispatch<SetStateAction<string>>;
}

const Header = ({page, setPage}: HeaderProps) => {
    const {logout} = useAuth()

    return (
        <header className="bg-[#161D2F] w-full h-[56px] lg:hidden">
           <div className="flex my-4 mx-4 md:mx-8">
                <div className="w-[25px] h-[20px] cursor-pointer">
                    <Link href="/">
                        <a><img src="/assets/logo.svg" alt="logo" /></a>
                    </Link>
                </div>
                <div className="flex mx-auto space-x-5 w-[133.5px]">
                    <div className="w-4 h-4 cursor-pointer" onClick={() => setPage('Home')}>
                        <img 
                            src={`${page === 'Home'? "/assets/icon-nav-home-active.svg" : "/assets/icon-nav-home.svg" }`}
                            alt="home"/>
                    </div>
                    <div className="w-4 h-4 cursor-pointer" onClick={() => setPage('Movies')}>
                        <img 
                        src={`${page === 'Movies'? "/assets/icon-nav-movies-active.svg" : "/assets/icon-nav-movies.svg" }`}
                        alt="movies" />
                    </div>
                    <div className="w-4 h-4 cursor-pointer" onClick={() => setPage('TV Series')}>
                        <img 
                            src={`${page === 'TV Series'? "/assets/icon-nav-tv-series-active.svg" : "/assets/icon-nav-tv-series.svg" }`}
                            alt="tv-series" />
                    </div>
                    <div className="w-4 h-4 cursor-pointer" onClick={() => setPage('Bookmarked')}>
                        <img 
                            src={`${page === 'Bookmarked'? "/assets/icon-nav-bookmark-active.svg" : "/assets/icon-nav-bookmark.svg" }`}
                            alt="bookmarked" />
                    </div>
                </div>
                <div className="w-6 h-6 cursor-pointer">
                    <img src="/assets/image-avatar.png" alt="avatar" onClick={logout}/>
                </div>
           </div>

        </header>
    );
}

export default Header;