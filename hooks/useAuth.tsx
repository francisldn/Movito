import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from 'firebase/auth'
import {auth} from '../firebase/firebaseConfig';
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { collection,  DocumentData, addDoc, doc, getDoc, CollectionReference, setDoc} from 'firebase/firestore';
import {db} from '../firebase/firebaseConfig';
import { UserType } from '../movieType.typings';

// define the children type
interface AuthProviderProps {
    children: React.ReactNode;
}

// define AuthContext prop type
interface IAuth {
    user: User | null
    signUp: (email: string, password: string) => Promise<void>
    signIn: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    error?: string | null
    loading?: boolean
}

// this will wrap the children and pass the props to its children
const AuthContext = createContext<IAuth>({
    user:null,
    signUp: async () => {},
    signIn: async () => {},
    logout: async () => {},
    error: null,
    loading: false
})

// this contains the logic of setting the states (props)
export const AuthProvider = ({children}:AuthProviderProps) => {
    const [loading, setLoading] = useState(false)
    const [initialLoading, setInitialLoading] = useState(true)
    // firebase user
    const [user, setUser] = useState<User|null>(null)
    const [error, setError] = useState(null)
    const router = useRouter()

    useEffect(() => {
        // redirect user to login page if user is not signed up
        onAuthStateChanged(auth, (user) => {
            if(user) {
                setUser(user)
                setLoading(false)
            } else {
                setUser(null)
                setLoading(true)
                router.push('/login')
            }
            setInitialLoading(false)
        })
    }, [auth])
    
    // sign up with email and password
    // use createUserWithEmailandPassword function from firebase
    const signUp = async (email: string, password: string) => {
        setLoading(true);
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false)
            
            setDoc(doc(db, 'users', userCredential.user.uid),
                    {
                        id: userCredential.user.uid,
                        email:userCredential.user.email,
                        myBookmark:[],
            })
            
            
        })
        .catch((error) => alert(error.message))
        .finally(()=> setLoading(false));
 
    }
    
    // sign in with email and password
    // use signInwithEmailandPassword function from firebase
    const signIn = async (email: string, password: string) => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setUser(userCredential.user)
            router.push('/')
            setLoading(false)
        })
        .catch((error) => alert(error.message))
        .finally(()=> setLoading(false));
    }

    //sign out 
    const logout = async() => {
        setLoading(true)
        // signout from firebase
        await signOut(auth).then(()=> {
            setUser(null)
        })
        .catch((error) => alert(error.message))
        .finally(()=> setLoading(false))
    }
    
    // more performant
    // similar to useEffect but only re-compute if one of the dependencies changes
    const memoedValue = useMemo(() => ({
        user, 
        signUp, 
        signIn, 
        loading, 
        logout,
        error
    }), [user, loading, error])


    return (
        <AuthContext.Provider value={memoedValue}>
            {!initialLoading && children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
};
