import { DocumentData } from "firebase/firestore";
import { Movie } from "../movieType.typings";
import Thumbnail from "./Thumbnail";

interface Props {
    movieList: Movie[] | DocumentData[];
    searchTitle: string | null;
}

const MoviesPage = ({movieList, searchTitle}:Props) => {
    return (
        <div className={`mx-4 md:mx-6 ${searchTitle && "hidden"}`}>
         <div className="mt-4">
             <h1 className="title">Movies</h1>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-x-4 mx-4">
             {
                 movieList.map((show) => <Thumbnail key={show.id} show={show}/>)
             }
             </div>
             
         </div>
     </div>
    );
}

export default MoviesPage;