import { Button } from "@/components/ui/button";
import { IoMailOutline } from "react-icons/io5";
import { RiLock2Line } from "react-icons/ri";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "@/firebase/firebaseConfig"
import { useState } from "react";
import { toast } from "sonner";
import { AiOutlineUser } from "react-icons/ai";
import LoadingButton from "@/components/loading-button";
import { doc, setDoc } from "firebase/firestore";
import { useNavigator } from "@/contexts/navigator-context";

type params = {
    changeSubpage : (index: number) => void
}

const RegisterSubpage = ({changeSubpage} : params) => {

    const [userData, setUserData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigator();

    const register = async () => {
        setLoading(true);
        if(userData.password !== userData.confirmPassword) {
            setError('Password and Confirm Password does not match');
            setLoading  (false);
            return;
        }
        if(userData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }
        if(userData.email === '' || userData.password === '' || userData.confirmPassword === '' || userData.firstName === '' || userData.lastName === '') {
            setError('Please fill in all fields');
            setLoading(false);
            return;
        }
        let creds : any = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredential) => {
                return userCredential;
            })
            .catch((error) => {
                console.log(error.message);
            });
            await setDoc(doc(db, 'users', creds.user.uid), {
                firstName : userData.firstName,
                lastName : userData.lastName,
                email: userData.email,
            });
        setError('');
        toast('Account created successfully');
        setLoading(false);
        // changeSubpage(0);
        // navigate('/');
    }

    return (
        <>
        <div className='w-full flex flex-col gap-4'>
            <p className='text-pageCream text-2xl font-chakra'>Register</p>

            <div className="flex gap-4">
                <div className='relative w-full flex items-center'>
                    <AiOutlineUser className='text-pageCream absolute ml-2'/>
                    <input 
                        className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                        placeholder='First Name' type={'text'} value={userData.firstName}
                        onChange={(e) => setUserData({...userData, firstName: e.target.value})}
                    />
                </div>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='Last Name' type={'text'} value={userData.lastName}
                    onChange={(e) => setUserData({...userData, lastName: e.target.value})}
                />
            </div>
            
            <div className='relative w-full flex items-center'>
                <IoMailOutline className='text-pageCream absolute ml-2'/>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='silitonga@saksang.edu' type={'email'} value={userData.email}
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
            <div className='relative w-full flex items-center'>
                <RiLock2Line className='text-pageCream absolute ml-2'/>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='Confirm your password' type={'password'} value={userData.confirmPassword}
                    onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
                />
            </div>

            <p className="text-red-500 font-chakra text-sm">{error}</p>

            {
                loading ? (
                    <LoadingButton className="rounded-none bg-darkCream text-stone-700 font-chakra hover:bg-stone-500 mt-12 flex gap-2"/>
                ) : (
                    <Button className='rounded-none bg-darkCream text-stone-700 font-chakra hover:bg-stone-500 mt-12' onClick={register}>Register</Button>
                )
            }
            
            <p className='text-pageCream text-sm font-chakra text-opacity-50'>Already have an account? <span className='text-pageBlue cursor-pointer'onClick={() => changeSubpage(0)}>Sign In</span></p>

        </div>
        </>
    )
}

export default RegisterSubpage;