import { DocumentData } from 'firebase/firestore';
import { Movie } from '../movieType.typings';
import Thumbnail from './Thumbnail';
import ThumbnailTrending from './ThumbnailTrending';
interface Props {
    trendingList: Movie[] | DocumentData[];
    recommendedList: Movie[] | DocumentData[];
    searchTitle: string | null;
}

const Home = ({trendingList, recommendedList, searchTitle}:Props) => {
    return (
        <div className={`mx-4 md:mx-6 max-w-[calc(100vw_-_10rem)] ${searchTitle && "hidden"}`}>
           <div>
                <h1 className="title">Trending</h1>
                <div className="flex overflow-x-scroll scrollbar-hide space-x-4 w-full">
                    {
                    trendingList.map((show)=> <ThumbnailTrending key={show.id} show={show}/>)
                    }
                </div>
                
            </div>
            <div className="mt-4">
                <h1 className="title">Recommended for you</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-x-4 mx-4">
                {
                    recommendedList.map((show) => <Thumbnail key={show.id} show={show}/>)
                }
                </div>
                
            </div>
        </div>
    );
}

export default Home;