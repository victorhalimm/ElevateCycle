
const CalendarCellDecor = ({content, className} : {content : string, className? : string}) => {
    return (
        <td className={`w-12 h-12 text-pageCream ${className} text-center align-middle font-chakra select-none`}>
            {content}
        </td>
    )
}

export default CalendarCellDecor;