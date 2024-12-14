import React, { useEffect } from "react";
import "./Notifications.css";
import closeIcon from "../../assets/close.png";

// Define the prop types for the Notification component
interface NotificationProps {
    message: string; // Message to display in the notification
    type?: "error" | "success" | "info"; // Type of notification with default value
    onClose: () => void; // Callback to handle closing the notification
}

const Notification: React.FC<NotificationProps> = ({ message, type = "error", onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 5000);
        return () => clearTimeout(timer); // Clear the timer on unmount
    }, [onClose]);

    return (
        <div className={`notification ${type}`}>
            <span>{message}</span>
            <img
                src={closeIcon}
                alt="Close"
                className="notification-close"
                onClick={onClose}
            />
        </div>
    );
};

export default Notification;
