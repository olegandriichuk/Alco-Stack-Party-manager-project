import React, { useEffect, useState } from "react";

type CountdownTimerProps = {
    preparationDate: string; // The preparation date to count down to
    eventDate: string; // The main event date
    onTimerComplete: (state: "DEFAULT" | "PREPARATION" | "EXTRA_DAY" | "FINAL") => void; // Callback on timer reset
    //allowAlcoholUpdate: boolean; // Controls alcohol ranking updates
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
                                                           preparationDate,
                                                           eventDate,
                                                           onTimerComplete,
                                                       }) => {
    const [targetDate, setTargetDate] = useState(new Date(preparationDate));
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [currentState, setCurrentState] = useState<"DEFAULT" | "PREPARATION" | "EXTRA_DAY" | "FINAL">(
        "DEFAULT"
    );

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();
            console.log("ggggg");
            console.log("current sr", currentState);
            if (difference <= 0) {
                if (currentState === "DEFAULT") {
                    console.log("Switching to PREPARATION state.");
                    setTargetDate(new Date(preparationDate));
                    setCurrentState("PREPARATION");
                    onTimerComplete("PREPARATION");
                } else if (currentState === "PREPARATION") {
                    console.log("Switching to EXTRA_DAY state.");
                    const nextTarget = new Date(targetDate.getTime() + 1 * 60 * 1000);// Extra Day (1 minute for demo)
                    setTargetDate(nextTarget);
                    setCurrentState("EXTRA_DAY");
                    onTimerComplete("EXTRA_DAY");
                } else if (currentState === "EXTRA_DAY") {
                    console.log("Switching to FINAL state.");
                    setTargetDate(new Date(eventDate));
                    setCurrentState("FINAL");
                    onTimerComplete("FINAL");
                } else {
                    console.log("Final state reached.");
                    onTimerComplete("FINAL");
                }
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft(
                `${days}:${hours.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
            );
        };

        const interval = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
    }, [targetDate, currentState, onTimerComplete]);

    return (
        <div
            style={{
                position: "absolute",
                top: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "1.5rem",
                fontWeight: "bold",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                padding: "10px",
                borderRadius: "5px",
                zIndex: 100,
            }}
        >
            {timeLeft}
        </div>
    );
};



export default CountdownTimer;
