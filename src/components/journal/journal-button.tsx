import { Journal } from "@/lib/types/journals/journal";
import { formatDate } from "@/lib/utils/date-utils";
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

    let active = false;

    if(journal.id)
        active = window.location.pathname.includes(journal.id)

    return (
        <div 
            className="py-2 flex items-center gap-2 cursor-pointer select-none" 
            onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <GrDocumentText className={`opacity-30 transition-all duration-200 ${hovered ? "opacity-80" : ""} ${active ? "opacity-80 text-lighterBlue" : "opacity-30"}`}/>

            {/* @ts-expect-error  it exists*/}
            <p className={`${hovered ? "opacity-100" : active ? "opacity-100 text-lighterBlue" : "opacity-60"}`}>{formatDate(journal?.date?.toDate())}</p>
        </div>
    )
}

export default JournalButton;