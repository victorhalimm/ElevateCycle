/* eslint-disable @typescript-eslint/no-explicit-any */
const Header : React.FC<{children : any}> = ({children}) => {
    return (
        <div className="text-2xl text-white font-semibold">
            {children}
        </div>
    )
}

export default Header;