import { DocumentData } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { Movie } from "../movieType.typings";
import Thumbnail from "./Thumbnail";
interface Props {
    searchList: Movie[] | DocumentData[] | null;
    searchTitle: string | null;
}
const SearchPage = ({searchList, searchTitle}:Props) => {

    return (
        <div className="mx-4 md:mx-6">
         <div className="mt-4">
             <h1 className="title">{`Found ${searchList?.length && searchList.length} search results for ${searchTitle}`}</h1>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-x-4 mx-4">
             {
                 searchList && searchList?.map((show) => <Thumbnail key={show.id} show={show}/>)
             }
             </div>
             
         </div>
     </div>
    );
}

export default SearchPage;