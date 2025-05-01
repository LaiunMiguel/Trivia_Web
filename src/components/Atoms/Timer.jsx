import React, { useState, useEffect } from 'react';

const Timer = ({ timeLimit, isActive, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(timeLimit);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            onTimeUp();
        }
    }, [isActive, timeLeft, onTimeUp]);

    useEffect(() => {
        setTimeLeft(timeLimit);
    }, [timeLimit]);

    return (
        timeLeft
    );
};

export default Timer;
