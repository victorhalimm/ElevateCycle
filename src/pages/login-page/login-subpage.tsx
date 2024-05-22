import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoMailOutline } from "react-icons/io5";
import { RiLock2Line } from "react-icons/ri";

type params = {
    changeSubpage : (index: number) => void
}

const LoginSubpage = ({changeSubpage} : params) => {
    return (
        <>
        <div className='w-full flex flex-col gap-4'>
            <p className='text-pageCream text-2xl font-chakra'>Login</p>
            
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
            <Button className='rounded-none bg-darkCream text-stone-700 font-chakra hover:bg-stone-500 mt-12'>Login</Button>
            
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