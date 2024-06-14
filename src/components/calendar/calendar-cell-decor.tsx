
const CalendarCellDecor = ({content, className} : {content : string, className? : string}) => {
    return (
        <td className={`w-10 h-10 text-pageCream ${className} text-center align-middle font-chakra select-none`}>
            {content}
        </td>
    )
}

export default CalendarCellDecor;