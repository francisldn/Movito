import { collection, DocumentData, onSnapshot, setDoc, doc, getDocs, getDoc } from 'firebase/firestore';
import { useState, useEffect, useMemo, createContext, useContext, Dispatch, SetStateAction } from 'react';
import { db } from '../firebase/firebaseConfig';
import { Movie, UserType } from '../movieType.typings';
import useAuth from './useAuth';

// NOTE: this hook is not used --> but could potentially improve performance if set up correctly
interface ContextType {
    getBookmark: () => Movie[] | DocumentData[],
    bookmark: Movie[] | DocumentData[],
    setBookmark: Dispatch<SetStateAction<Movie[] | Document[]>>,
    bmMoviesList: Movie[] | DocumentData[],
    setBMMoviesList:Dispatch<SetStateAction<Movie[] | Document[]>>,
    bmTVList:Movie[] | DocumentData[],
    setBMTVList: Dispatch<SetStateAction<Movie[] | Document[]>>,
}

const ContextDefaultValues: ContextType = {
    getBookmark: () => [],
    bookmark: [],
    setBookmark: () => {},
    bmMoviesList: [],
    setBMMoviesList:() => {},
    bmTVList: [],
    setBMTVList: () => {},
}

export const BMContext = createContext<ContextType>(ContextDefaultValues);

export function BMContextProvider() {
    return useContext(BMContext);
}

// hook to fetch user's bookmark
export const useBookmark = (uid: string | undefined) => {
    const {user} = useAuth()
    let id = user?.uid || '0'
    const docRef = doc(db,"users",id)
    const [bookmark, setBookmark] = useState<Movie[]| Document[]>([]);
    const [bmMoviesList, setBMMoviesList] = useState<Movie[]| Document[]>([]);
    const [bmTVList, setBMTVList] = useState<Movie[]| Document[]>([]);

    const updateBookmark = async () => {
        const docSnap = await getDoc(docRef);
        setBookmark(docSnap.data()?.myBookmark)
        setBMMoviesList((bookmark as Movie[]).filter((show)=> show.category === 'Movie'))
        setBMTVList((bookmark as Movie[]).filter((show)=> show.category === 'TV Series'))
        return docSnap.data()?.myBookmark
    }   

    useEffect(() => {  
        updateBookmark();
        console.log('loading')
    },[user,db])

    const getBookmark = async () => {
        const docSnap = await getDoc(docRef);
        return docSnap.data()?.myBookmark
    }

    return {getBookmark};
}
