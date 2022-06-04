import { LoginProps } from "./LoginPage";

interface SignUpProps extends LoginProps {
    password: string;
}

const SignUpPage = ({isLogin,setLogin, register, handleSubmit, onSubmit, errors, password }: SignUpProps) => {
    return (
        <div className="flex flex-col mx-auto gap-3 min-w-[327px] max-w-[400px] my-[132px] min-h-[365px] space-y-5 bg-[#161D2F] px-6 rounded-2xl">
             <h1 className="text-[32px] font-light pt-8">{ isLogin ? "Login" : "Sign Up"}</h1>
                    <form className="flex flex-col gap-5 pb-8" onSubmit={handleSubmit(onSubmit)}>
                        <label>
                            <input type="email" 
                                    placeholder="Email address"
                                    className="input"
                                    {...register('email', {required:true})}
                                />
                                {errors.email && <span className="warning">Please enter a valid email</span>}
                        </label>
                        <label>
                            <input type="password" 
                                placeholder="Password" 
                                className="input"
                                {...register('password', {required: true})}
                            />
                            {errors.password && <span className="warning">A valid password is required</span>}
                        </label>    
                        {!isLogin && (<label className={`${isLogin && "hidden"}`}>
                            <input type="password" 
                                placeholder="Repeat Password" 
                                className={isLogin ? "hidden" : "input"} 
                                {...register('confirmPassword',{required: 'confirm password is required',
                                validate: (value) => 
                                value === password || "The passwords do not match"
                            })}/>
                                {(errors.confirmPassword && !isLogin) && <span className="warning">{errors.confirmPassword.message}</span>}
                        </label>)}
                        
                        <button 
                            type="submit" 
                            className="bg-[#FC4747] rounded w-full h-12 mt-3 cursor-pointer hover:bg-white hover:text-[#161D2F]"
                        >
                            {isLogin ? "Login to your account":"Create an account" }
                        </button>
                        {isLogin 
                        ? <p className="mx-auto">Don't have an account? <span className="text-[#FC4747] mx-1 cursor-pointer" onClick={() => setLogin(false)}>Sign Up</span></p>
                        :  <p className="mx-auto">Already have an account? <span className="text-[#FC4747] mx-1 cursor-pointer" onClick={()=> setLogin(true)}>Login</span></p>
                        }
                    </form>
        </div>
    );
}

export default SignUpPage;