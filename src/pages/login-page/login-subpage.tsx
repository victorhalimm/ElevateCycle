import LoadingButton from "@/components/loading-button";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import { RiLock2Line } from "react-icons/ri";

type params = {
    changeSubpage : (index: number) => void
}

const LoginSubpage = ({changeSubpage} : params) => {

    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    
    const [_, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigator();

    const login = async () => {
        setLoading(true);
        if(userData.email === '' || userData.password === '') {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }
        try {
            await signInWithEmailAndPassword(auth, userData.email, userData.password);
        }
        catch(e) {
            setError('Invalid email or password');
            setLoading(false);
            return;
        }
        setError('');
        setLoading(false);
        // navigate("/");
    }

    return (
        <>
        <div className='w-full flex flex-col gap-4'>
            <p className='text-pageCream text-2xl font-chakra'>Login</p>
            
            <div className='relative w-full flex items-center'>
                <IoMailOutline className='text-pageCream absolute ml-2'/>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='johndoe@email.com' type={'email'} value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                />

            </div>
            <div className='relative w-full flex items-center'>
                <RiLock2Line className='text-pageCream absolute ml-2'/>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='Type your password' type={'password'} value={userData.password}
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                />

            </div>
            {
                loading ? (
                    <LoadingButton className='rounded-none bg-darkCream text-stone-700 font-chakra hover:bg-stone-500 mt-12' />
                ) : (
                    <Button className='rounded-none bg-darkCream text-stone-700 font-chakra hover:bg-stone-500 mt-12' onClick={login}>Login</Button>
                )
            }
            
            <p className='text-pageCream text-sm font-chakra text-opacity-50'>Don't have an account? <span className='text-pageBlue cursor-pointer'onClick={() => changeSubpage(1)}>Sign Up</span></p>

            <div className='flex items-center gap-3 opacity-40'>
                <div className='w-full bg-darkCream h-[1px]'></div>
                <p className='text-darkCream font-chakra'>Or</p>
                <div className='w-full bg-darkCream h-[1px]'></div>
            </div>
            <Button className='rounded-none border-darkCream border bg-transparent text-darkCream font-chakra hover:bg-stone-500 flex items-center gap-2'><FcGoogle />Login with Google</Button>

        </div>
        </>
    )
}

export default LoginSubpage;