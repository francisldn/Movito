import { DocumentData } from "firebase/firestore";
import { Movie } from "../movieType.typings";
import Thumbnail from "./Thumbnail";

interface Props {
    tvSeriesList: Movie[] | DocumentData[];
    searchTitle: string|null;
}

const TVPage = ({tvSeriesList, searchTitle}:Props) => {
    return (
        <div className={`sm:mx-2 md:mx-6 ${searchTitle && "hidden"}`}>
        <div className="mt-4">
            <h1 className="title">TV Series</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-x-4">
            {
                tvSeriesList.map((show) => <Thumbnail key={show.id} show={show}/>)
            }
            </div>
            
        </div>
    </div>
    );
}

export default TVPage;