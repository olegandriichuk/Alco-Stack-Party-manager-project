import React from 'react';
import './ProfilePage.css';
import ProfileCard from "../../components/ProfileCard/ProfileCard.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faHome} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Disco from '../../assets/disco.svg';



const ProfilePage: React.FC = () => {


    return (
        <div className="container-fluid p-0 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                    <img
                        src={Disco} // Adjust the path to your party icon
                        alt="Party Icon"
                        width="80"
                        height="80"
                    />
                </div>
                <Link to={"/home"} className="p-2" aria-label="Go to Home Page">
                    <FontAwesomeIcon icon={faHome} size="2x" color="black" />
                </Link>
            </div>

            <ProfileCard
                UserName="johndoe"
                name="John"
                Surname="Doe"
                Phone="+1234567890"
                Email="email@example.com"
                Address={{Country: "Country", Town: "Town", Street: "Street", ZipCode: "ZipCode"}}
                photoUrl="https://randomuser.me/api/portraits/men/3.jpg"
                formBackgroundUrl="https://images.cloudflareapps.com/ZAotxLiSkmDIeCENOzgQ_background-3.jpeg"
            />
        </div>
    );
}

export default ProfilePage;