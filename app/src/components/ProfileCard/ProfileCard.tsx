import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ProfileCard.css";
import {Link} from "react-router-dom";

interface Address {
    Country: string;
    Town: string;
    Street: string;
    ZipCode: string;
}

interface ProfileCardProps {
    UserName: string;
    name: string;
    Surname: string;
    Phone: string;
    Email: string;
    Address: Address;
    photoUrl: string;
    formBackgroundUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, Surname, Phone, Email, Address , photoUrl, formBackgroundUrl, UserName }) => {
    const profileCardStyle: React.CSSProperties = {
        backgroundImage: `url(${formBackgroundUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '90%',
        borderRadius: '20px',

    };
    const LinkStyle: React.CSSProperties = {
        textDecoration: 'none',
        color: 'black',
    }

    return (
        <div className="card" style={profileCardStyle}>
            <div className="card-body d-flex flex-row">
                <div className={"p-3 d-flex flex-column justify-content-around align-items-center"}>
                    <img style={{border: '1px solid black'}}
                         src={photoUrl} // Use the provided user photo URL
                         alt="User Photo"
                         className="rounded-circle"
                         width="100"
                         height="100"
                    />
                    <h5 className="card-title">{UserName}</h5>
                </div>
                <div className="card-text">
                    <Link to={"/profile/edit"} style={LinkStyle}>
                        <button className="btn btn-primary m-2 bg-dark">Edit Profile</button>
                    </Link>
                    <ul className="list-unstyled">
                        <li>Name :&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{name}</li>
                        <li>Surname : {Surname}</li>
                        <li>Phone :&nbsp;&nbsp;&nbsp;&nbsp; {Phone}</li>
                        <li>Email :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {Email}</li>
                        <li>Address :&nbsp; {Address.Street}, {Address.Town}, {Address.Country}, {Address.ZipCode}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
