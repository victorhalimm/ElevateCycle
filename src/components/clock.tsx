import { useState, useEffect } from 'react';
import "@/lib/styles/clock.css"

const Clock = ({className} : {className? : string}) => {

    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(timerId);
    }, []);

    return (
        <div className={`clock ${className}`}>
            <div className="hour_hand" style={{ transform: `rotateZ(${time.getHours() * 30}deg)` }} />
            <div className="min_hand" style={{ transform: `rotateZ(${time.getMinutes() * 6}deg)` }} />
            <div className="sec_hand" style={{ transform: `rotateZ(${time.getSeconds() * 6}deg)` }} />
            <span className="twelve">XII</span>
            <span className="one">I</span>
            <span className="two">II</span>
            <span className="three">III</span>
            <span className="four">IV</span>
            <span className="five">V</span>
            <span className="six">VI</span>
            <span className="seven">VII</span>
            <span className="eight">VIII</span>
            <span className="nine">IX</span>
            <span className="ten">X</span>
            <span className="eleven">XI</span>
        </div>
    );
};

export default Clock;
