
import Clock from '@/components/clock';
import { useNavigator } from '@/contexts/navigator-context';
import { useUser } from '@/contexts/user-context';
import { useEffect, useState } from 'react';
import LoginSubpage from './login-subpage';
import RegisterSubpage from './register-subpage';


const LoginPage = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [opacity, setOpacity] = useState(100);
    const user = useUser();
    const navigate = useNavigator();

    const changePage = async (index: number) => {
        setOpacity(0);
        await new Promise(resolve => setTimeout(resolve, 300));
        setCurrentPage(index);
        setOpacity(100);
    }

    const subpages = [
        <LoginSubpage changeSubpage={changePage}/>,
        <RegisterSubpage changeSubpage={changePage}/>
    ]

    useEffect(() => {
        if(user !== null) {
            navigate("/");
        }
    }, [user])


    return (
        <>
        <div className="w-screen h-screen bg-pageBlack flex justify-between">
            <div className='p-24 flex items-center'>
                <p className='text-pageCream font-chakra h-64 text-6xl font-semibold opacity-70 w-[70%] z-10'>Elevating Lives, One Cycle At a Time</p>
                <div className='fixed left-[10vw] bottom-[10vw] opacity-60' style={{transform: "scale(2.5)"}}>
                    <Clock/>
                </div>
            </div>
            <div className={`p-6 ${currentPage == 0 ? "w-[35vw]" : "w-[40vw]"} transition-all duration-500`}>
                <div className={`bg-darkBlue h-full shadow-lg p-10 `}>
                    <div className={`gap-6 flex flex-col justify-center w-full h-full transition-all duration-300`} style={{opacity: opacity + "%"}}>
                    {
                        subpages[currentPage]
                    }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginPage;