import { DocumentData, updateDoc, doc, arrayUnion, getDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState, useCallback } from "react";
import {db} from '../firebase/firebaseConfig';
import {useBookmark} from "../hooks/useBookmark";
import { Movie } from "../movieType.typings";
import useAuth from "../hooks/useAuth"

interface Props {
    show: Movie | DocumentData;
}
const Thumbnail = ({show}:Props) => {
    const {user} = useAuth();
    let id = user?.uid || '0'
    const docRef = doc(db,"users",id!)
    const {getBookmark} = useBookmark(id!)
    const [bookmark, setBookmark] = useState<Movie[]| Document[]>([])
    const [addedToList, setAddedToList] = useState(false);

    const handleBookmark = useCallback(async () => {
        if(!bookmark) return;
        if((bookmark as Movie[]).filter((movie) => movie.id === show.id).length == 0) {
            const updateShow = {...show, isBookmarked: true}
            await updateDoc(docRef, {
                myBookmark: arrayUnion(updateShow)  
            })
            setBookmark([{...bookmark,...updateShow}] as Movie[])
        } else {
            const bookmark = await getBookmark()
                .then((results) => results.filter((movie:Movie|DocumentData)=> movie.id !== show.id))
            await updateDoc(docRef, {
                myBookmark: bookmark
            })
            setBookmark!(bookmark);
        }

    },[bookmark])

    useEffect(() => {
        async function updateBookmark() {
            const docSnap = await getDoc(docRef);
            setBookmark(docSnap.data()?.myBookmark)
            return docSnap.data()?.myBookmark
        }
        updateBookmark();
        console.log('update2')
    },[db])

    useEffect(() => {
        if(!bookmark) return;
        setAddedToList((bookmark as Movie[]).filter((result)=> result.id === show.id).length !==0)
    },[handleBookmark])

    return (
        <div className="flex flex-col min-w-[164px] min-h-[154px] md:min-w-[220px] md:min-h-[140px] lg:min-w-[280px] lg:min-h-[226px] my-4">
            <div className={`background-image-recommended`} style={{backgroundImage:`url(${show.thumbnail.regular.large})`}}>
                    <div className="flex rounded-full bg-[rgba(222,219,219,0.4)] min-w-[32px] min-h-[32px] items-center justify-center place-self-end cursor-pointer hover:bg-[rgba(255,255,255,0.5)]"
                    onClick={() => handleBookmark()}
                    >
                        <img src={addedToList 
                        ?`/assets/icon-bookmark-full.svg`
                        : `/assets/icon-bookmark-empty.svg`
                        } alt="bookmark" onClick={() => handleBookmark()}/>
                    </div>   
            </div>
            <div className="flex flex-col place-content-end h-full pb-3 pl-4 pt-2">
                <div className="flex mb-0">
                    <p className="text-[12px] mr-3">{show.year}</p>
                    <div className="flex w-3 h-3">
                        <img 
                            src={show.category==='Movie' 
                            ? "/assets/icon-category-movie.svg"
                            : "/assets/icon-category-tv.svg"
                            } 
                            alt=""
                        />
                    </div>
                    <p className="text-[12px] pb-0 mx-3">{show.category}</p>   
                    <p className="text-[12px] pb-0">{show.rating}</p>  
                </div>
                <p className="text-[14px] md:text-[18px]">{show.title}</p>   
            </div>
        </div>
        
    );
}

export default Thumbnail;