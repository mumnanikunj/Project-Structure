import React, { useEffect,useState } from 'react';
import { Text } from 'react-native';

const TimerComponent = ({ initialTime, textStyle ={} }) => {
    const initialSeconds = timeStringToSeconds(initialTime);
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        setSeconds(timeStringToSeconds(initialTime))
    }, [initialTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        const pad = (num) => (num < 10 ? `0${num}` : num);

        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    return <Text style={textStyle}>{formatTime(seconds)}</Text>;
};

const timeStringToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

export default TimerComponent;
