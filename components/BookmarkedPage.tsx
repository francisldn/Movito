import { doc, DocumentData, getDoc} from "firebase/firestore";
import {useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import useAuth from "../hooks/useAuth";
import { Movie } from "../movieType.typings";
import Thumbnail from "./Thumbnail";
interface Props {
    searchTitle: string | null;

}

const BookmarkedPage = ({searchTitle}:Props) => { 
    const {user} = useAuth();
    let id = user?.uid || '0';
    const [bookmark, setBookmark] = useState<Movie[]| DocumentData[]>([]);
    const [bmMoviesList, setBMMoviesList] = useState<Movie[]| DocumentData[]>([]);
    const [bmTVList, setBMTVList] = useState<Movie[]| DocumentData[]>([]);
    const [isLoading, setLoading] = useState(true);
    const docRef = doc(db,"users",id!);
    
    useEffect(() => {  
        setLoading(true)
        const updateBookmark = async () => {
            const docSnap = await getDoc(docRef);
            setBookmark(docSnap.data()?.myBookmark)
            setBMMoviesList((bookmark as Movie[]).filter((show)=> show.category === 'Movie'))
            setBMTVList((bookmark as Movie[]).filter((show)=> show.category === 'TV Series'))
            return docSnap.data()?.myBookmark
        }   
        updateBookmark();
        setLoading(false)
    },[user,db, docRef])

    return (
        <div className={`sm:mx-2 md:mx-6 ${searchTitle && "hidden"}`}>
            
           <div className="mt-4">
                <h1 className="title">Bookmarked Movies</h1>
                <p className={`flex flex-1 mx-5 mt-6 text-[#FC4747] ${bmMoviesList.length!==0 && "hidden"}`}>You do not have any movies bookmarked.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-x-4 w-screen lg:w-full">
                {
                    bmMoviesList.map((show) => <Thumbnail key={(show as Movie).id} show={show}/>)
                }
                </div>
            </div>
            
            <div className="mt-4">
                <h1 className="title">Bookmarked TV Series</h1>
                {<p className={`flex flex-1 mx-5 mt-6 text-[#FC4747] ${bmTVList.length!==0 && "hidden"}`}>You do not have any TV series bookmarked.</p>}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-x-4 w-screen lg:w-full">
                {
                    bmTVList.map((show) => <Thumbnail key={(show as Movie).id} show={show} />)
                }
                </div>
            </div>
        </div>
    );
}

export default BookmarkedPage;