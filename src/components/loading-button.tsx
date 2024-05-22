import { RiLoader4Fill } from "react-icons/ri";
import { Button } from "./ui/button";

const LoadingButton = ({className} : {className? : string}) => {
    return (
        <Button className={className} disabled><RiLoader4Fill className="animate-spin text-lg"/> Loading</Button>
    )
}

export default LoadingButton;