/* eslint-disable @typescript-eslint/no-explicit-any */
const Header : React.FC<{children : any}> = ({children}) => {
    return (
        <div className="text-2xl text-pageCream font-semibold font-chakra">
            {children}
        </div>
    )
}

export default Header;