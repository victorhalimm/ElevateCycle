import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import { RiLock2Line } from "react-icons/ri";

type params = {
    changeSubpage : (index: number) => void
}

const RegisterSubpage = ({changeSubpage} : params) => {

    const register = async () => {
        
    }

    return (
        <>
        <div className='w-full flex flex-col gap-4'>
            <p className='text-pageCream text-2xl font-chakra'>Register</p>
            
            <div className='relative w-full flex items-center'>
                <IoMailOutline className='text-pageCream absolute ml-2'/>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='silitonga@saksang.edu' type={'email'}
                />

            </div>
            <div className='relative w-full flex items-center'>
                <RiLock2Line className='text-pageCream absolute ml-2'/>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='Type your password' type={'password'}
                />
            </div>
            <div className='relative w-full flex items-center'>
                <RiLock2Line className='text-pageCream absolute ml-2'/>
                <input 
                    className='focus-visible:outline-none bg-transparent w-full border-b p-2 indent-7 border-darkCream placeholder:text-darkCream placeholder:text-opacity-30 text-darkCream' 
                    placeholder='Confirm your password' type={'password'}
                />
            </div>
            <Button className='rounded-none bg-darkCream text-stone-700 font-chakra hover:bg-stone-500 mt-12'>Login</Button>
            
            <p className='text-pageCream text-sm font-chakra text-opacity-50'>Already have an account? <span className='text-pageBlue cursor-pointer'onClick={() => changeSubpage(0)}>Sign In</span></p>

        </div>
        </>
    )
}

export default RegisterSubpage;