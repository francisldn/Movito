import { useState } from "react";
import useAuth from "../hooks/useAuth";
import {SubmitHandler, useForm} from 'react-hook-form'
import LoginPage from "../components/LoginPage";
import {InputProps} from '../components/LoginPage'
import SignUpPage from "../components/SignUpPage";
import Link from "next/link";

const Login = () => {
    const [isLogin, setLogin] = useState(true)
    const {signIn, signUp} = useAuth()
    const {
        register, 
        handleSubmit, 
        watch, 
        formState:{errors}
    } = useForm<InputProps>({
        mode: 'onTouched'
    }) 
    
    const onSubmit: SubmitHandler<InputProps> = async({email, password}) => {
        if(isLogin) {
            await signIn(email, password)
        } else {
            await signUp(email, password)
        }
    }
    const password = watch('password')

    return (
        <>
            <header className="flex my-12 mx-auto justify-center">
                <Link href="/login">
                    <a><img src="/assets/logo.svg" alt="logo" /></a>
                </Link>
            </header>
            <main>
            {isLogin 
                ? (<LoginPage isLogin={isLogin} setLogin={setLogin} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors}/>)
                : (<SignUpPage isLogin={isLogin} setLogin={setLogin} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit} errors={errors} password={password}/>)
            }
            </main>
        </>
    );
}

export default Login;