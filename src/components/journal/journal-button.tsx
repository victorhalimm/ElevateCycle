import { Journal } from "@/lib/types/journals/journal";
import { instanceOfDailyJournal, instanceOfWeeklyJournal } from "@/lib/utils/journal-utils";
import { useState } from "react";
import { GrDocumentText } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const JournalButton = ({journal} : {journal : Journal}) => {

    const [hovered, setHovered] = useState(false)
    const navigate = useNavigate();

    const handleClick = () => {
        if(instanceOfDailyJournal(journal)) {
            navigate(`/journal/daily/${journal.id}`)
        }
        if(instanceOfWeeklyJournal(journal)) {
            navigate(`/journal/weekly/${journal.id}`)
        }
    }

    return (
        <div 
            className="py-2 flex items-center gap-2 cursor-pointer" 
            onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <GrDocumentText className={`opacity-30 transition-all duration-200 ${hovered ? "opacity-80" : ""}`}/>
            <p className={`${hovered ? "opacity-100" : "opacity-60"}`}>10th February 2024</p>
        </div>
    )
}

export default JournalButton;