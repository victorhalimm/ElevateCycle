import { instanceOfDailyJournal, instanceOfWeeklyJournal } from "@/lib/utils/journal-utils";
import { useEffect, useState } from "react"
import { GrDocumentText } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

type props = {
    mode : 'daily' | 'weekly',
}

export default function TodayJournalButton({mode} : props) {

    const [hovered, setHovered] = useState(false)
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/journal/${mode}/today`)
    }

    return (
            <div 
            className="py-2 flex items-center gap-2 cursor-pointer" 
            onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <GrDocumentText className={`opacity-30 transition-all duration-200 ${hovered ? "opacity-80" : ""}`}/>
            <p className={`${hovered ? "opacity-100" : "opacity-60"}`}>{
                mode === 'daily' ? 'Today' : 'This Week'
            }</p>
        </div>
    )

}