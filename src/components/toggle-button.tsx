
type ToggleButtonProps = {
    onToggle: () => void;
    isToggled: boolean;
    icon: JSX.Element;
    className?: string;
}

const ToggleButton = ({ onToggle, isToggled, icon, className} : ToggleButtonProps) => {
    return (
        <div 
            className={`h-8 px-2 hover:bg-zinc-800 rounded-md flex items-center text-xl text-pageCream transition-all duration-200 cursor-pointer ${className} 
                ${isToggled ? "bg-zinc-700 bg-opacity-50" : ""}`}
                onClick={onToggle}
        >
            {icon}
        </div>
    )
}

export default ToggleButton;