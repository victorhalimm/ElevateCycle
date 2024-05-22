import logo from '../../assets/dark-logo.png';

const LoginPage = () => {

    

    
    return (
        <div className="w-screen h-screen bg-pageBlack flex justify-between">
            <div className='p-24 flex items-center'>
                <p className='text-pageCream font-chakra h-64 text-6xl font-semibold opacity-70 w-[70%]'>Elevating Lives, One Cycle At a Time</p>
                <img src={logo} className="opacity-[1%] w-[60vw] fixed bottom-[-20vh] left-[-15vw]"/>
            </div>
            <div className='p-6'>
                <div className='bg-darkBlue w-[35vw] h-full shadow-lg'>

                </div>
            </div>
        </div>
    )
}

export default LoginPage;