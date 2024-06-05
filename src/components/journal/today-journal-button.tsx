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

    const active = window.location.pathname.includes(`/journal/${mode}/today`)

    return (
            <div 
            className="py-2 flex items-center gap-2 cursor-pointer select-none" 
            onMouseOver={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
            onClick={handleClick}
        >
            <GrDocumentText className={`transition-all duration-200 ${hovered ? "opacity-80" : ""} ${active ? "opacity-80 text-lighterBlue" : "opacity-30"}`}/>
            <p className={`${hovered ? "opacity-100" : active ? "opacity-100 text-lighterBlue" : "opacity-60"} `}>{
                mode === 'daily' ? 'Today' : 'This Week'
            }</p>
        </div>
    )

}